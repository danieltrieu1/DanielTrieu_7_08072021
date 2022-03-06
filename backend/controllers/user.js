// Imports
const bcrypt = require("bcrypt");
const db = require("../db.config");
const jwt = require("jsonwebtoken");
const User = db.user;

// Ensemble des utilisateurs
exports.getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => res.json(users))
    .catch((error) =>
      res.status(500).json({ message: "Database Error", error: error })
    );
};

//-------------------------------------------------------------------------

// Utilisateur unique
exports.getUser = (req, res) => {
  let userId = parseInt(req.params.id);

  // Vérification du champs id
  if (!userId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  // Récupération de l'utilisateur
  User.findOne({ where: { id: userId }, raw: true })
    .then((user) => {
      if (user === null) {
        return res.status(404).json({ message: "This user does not exit !" });
      }

      // Utilisateur trouvé
      return res.status(200).json({ message: "User Found", data: user });
    })
    .catch((error) =>
      res.status(500).json({ message: "Database Error", error: error })
    );
};

//-------------------------------------------------------------------------

// Création de l'utilisateur / Signup
exports.createUser = async (req, res) => {
  const { name, firstname, email, username, password } = req.body;

  // Validation des données reçus
  if (!name || !firstname || !email || !username || !password) {
    return res.json(400).json({ message: "Missing Data" });
  }

  try {
    // Vérification si l'utilisateur existe déjà
    let user = await User.findOne({ where: { email: email }, raw: true });
    if (user !== null) {
      return res
        .status(409)
        .json({ message: `${firstname} ${name} already exists !` });
    }

    // Hashage du mot de passe utilisateur
    let hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
    req.body.password = hash;

    // Céation de l'utilisateur

    let User = await User.create(req.body);
    return res.json({ message: "User Created", data: user });
  } catch (error) {
    if (error.name == "SequelizeDatabaseError") {
      res.status(500).json({ message: "Database Error", error: error });
    }
    res.status(500).json({ message: "Hash Process Error", error: error });
  }
};

//-------------------------------------------------------------------------

// Modification l'utilisateur
exports.updateUser = async (req, res) => {
  let userId = parseInt(req.params.id);

  // Vérification du champ id
  if (!userId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  try {
    // Recherche de l'utilisateur et vérification
    let user = await User.findOne({ where: { id: userId }, raw: true });
    if (user === null) {
      return res.status(404).json({ message: "This user does not exist !" });
    }
    let newUserData = {};
    if (req.file) {
      newUserData = {
        ...req.body,
        attachment: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      };
      // console.log("test")
    } else {
      newUserData = {
        ...req.body,
      };
    }
    User.update(newUserData, { where: { id: userId } }).then(() => {
      User.findByPk(req.params.id).then((newuser) => {
        if (newuser === null) {
          return res
            .status(404)
            .json({ message: "This user does not exist !" });
        }
        const userData = {
          id: newuser.id,
          name: newuser.name,
          firstname: newuser.firstname,
          email: newuser.email,
          username: newuser.username,
          attachment: newuser.attachment,
          isAdmin: 0
        };
        const token = jwt.sign(
          {
            id: newuser.id,
            name: newuser.name,
            firstname: newuser.firstname,
            email: newuser.email,
            username: newuser.username,
          },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_DURING }
        );
        // console.log(userData)
        return res.status(201).json({ accessToken: token, userData });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Database Error", error: error });
  }
};

// Suppression de l'utilisateur (Hard Delete)
exports.deleteUser = (req, res) => {
  let userId = parseInt(req.params.id);

  // Vérification du champ id
  if (!userId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  // Suppression de l'utilisateur
  User.destroy({ where: { id: userId }, force: true })
    .then(() => res.status(204).json({ message: "User Deleted" }))
    .catch((error) =>
      res.status(500).json({ message: "Database Error", error: error })
    );
};
