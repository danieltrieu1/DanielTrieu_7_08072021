const db = require("../db.config");
const Post = db.post;
const Note = db.note;
const jwt = require("jsonwebtoken");

const fs = require("fs");

// Ensemble des messages
exports.getAllPosts = (req, res) => {
  Post.findAll({ include: Note })
    .then((post) => res.json(post))
    .catch((error) =>
      res.status(500).json({ message: "Database Error", error: error })
    );
};

// Message unique
exports.getPost = async (req, res) => {
  let postId = parseInt(req.params.id);

  // Vérification du champs id
  if (!postId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  try {
    // Récupération du message
    let post = await Post.findOne({ where: { id: postId }, raw: true });

    // Test si résultat null
    if (post === null) {
      return res.status(404).json({ message: "This post does not exit !" });
    }

    // Renvoi du message trouvé
    return res.json({ data: post });
  } catch (error) {
    return res.status(500).json({ message: "Database Error", error: error });
  }

};

// Création du message
exports.createPost = async (req, res) => {
  const { user_id, title, content, attachment } = req.body;
  console.log(req.body);

  // Validation des données reçues
  if (!user_id || !title || !content) {
    return res.status(400).json({ message: "Missing Data" });
  }

  if (attachment) {
    
    try {
      // Vérification si le message existe
      let post = await Post.findOne({ where: { title: title }, raw: true });
  
      // Création du message
      let newPost = {
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id,
        attachment: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      };
  
      post = await Post.create(newPost);
      return res.json({ message: "Post Created", data: post });
      
    } catch (error) {
      return res.status(500).json({ message: "Database Error", error: error });
    }

  } else {

    try {
      // Vérification si le message existe
      let post = await Post.findOne({ where: { title: title }, raw: true });
  
      // Création du message
      let newPost = {
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id,
      };
  
      post = await Post.create(newPost);
      return res.json({ message: "Post Created", data: post });
      
    } catch (error) {
      return res.status(500).json({ message: "Database Error", error: error });
    }

  }

};

// Modification du message
exports.updatePost = async (req, res) => {
  let postId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!postId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  try {
    // Recherche du message et vérification
    let post = await Post.findOne({ where: { id: postId }, raw: true });
    if (post === null) {
      return res.status(404).json({ message: "This message does not exist !" });
    }

    const filename = sauce.imageUrl.split("/images/")[1];

    fs.unlink(`images/${filename}`, () => {
      const postObject = req.file ?
        {
          ...JSON.parse(req.body.post),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${ req.file.filename }`,
        } : { ...req.body };

      Post.updateOne({ _id: req.params.id },{ ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Post modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    });

    // Mise à jour du message
    // await
    Post.update(newPostData, { where: { id: postId } }).then(() => {
      Post.findOne(req.params.id).then((newpost) => {
        if (newpost === null) {
          return res
            .status(404)
            .json({ message: "This post does not exist !" });
        }

        const postData = {
          id: newpost.id,
          user_id: newpost.user_id,
          title: newpost.title,
          content: newpost.content,
          attachment: newpost.attachment
        };

        return res.status(201).json({ postData });
      });
    });

    // return res.json({ message: 'Post Updated' })
  } catch (error) {
    return res.status(500).json({ message: "Database Error", error: error });
  }
};

// Suppression du message (Hard Delete)
exports.deletePost = (req, res) => {
  let postId = parseInt(req.params.id);

  // Vérification du champ id
  if (!postId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  Post.findByPk(
    postId
  ).then(
    (post) => {    
      const filename = post.attachment.split("/images/")[1];

      // fs.unlink: Permet la suppression du fichier
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: postId }, force: true })
        .then(() => res.status(204).json({ message: "Post Deleted" }))
        .catch((error) =>
          res.status(500).json({ message: "Database Error", error: error })
        );
      });
    }
  )
};
