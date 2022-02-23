const Post = require('../models/post')
 
// Ensemble des messages
exports.getAllPosts = (req, res) => {
    Post.findAll({ include: Note })
        .then( post => res.json({ data: post }))
        .catch( error => res.status(500).json({ message: 'Database Error', error: error }))
}

// Message unique
exports.getPost = async (req, res) => {
    let postId = parseInt(req.params.id)

    // Vérification du champs id
    if(!postId){
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {    
        // Récupération du message
        let post = await Post.findOne({ where: { id: postId }, raw: true })

        // Test si résultat null
        if (post === null) {
            return res.status(404).json({ message : 'This post does not exit !' })
    }

    // Renvoi du message trouvé
    return res.json({ data: post }) 

    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error: error })
    }


    //--------------------------------------------------------------------------------------
    // CODE PAS FACTORISÉ CORRECTEMENT
    // // Récupération du message
    // Post.findOne({ where: {id: postId, raw: true} })
    //     .then(post => {
    //         if (post === null) {
    //             return res.status(404).json({ message : 'This post does not exit !' })
    //         }

    //         // Message trouvé
    //         return res.json({ data: post }) 
    //     })
    //     .catch(error => res.status(500).json({ message: 'Database Error', error: error }))
    //---------------------------------------------------------------------------------------
}

// Création du message
exports.createPost = async (req, res) => {
    const { user_id, title, content } = req.body

    // Validation des données reçues
    if (!user_id || !title || !content) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si le message existe
        let post = await Post.findOne({ where: { title: title }, raw: true })
        
        //Test si résultat null
        if (post !== null) {
            return res.status(409).json({ message: `The message ${title} already exists !` })
        }

        // Création du message
        post = await Post.create(req.body)
        return res.json({ message: 'Post Created', data: post })
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error: error })
    }
}
    

    //-----------------------------------------------------------------------
    // CODE NON FACTORISE CORRECTEMENT
    // Post.findOne({ where: { user_id: user_id} && { title: title } && { content: content }, raw: true})
    //     .then(post => {
    //         // Vérification de l'existence de l'utilisateur
    //         if (post !== null) {
    //             return res.status(400).json({ message: `This message already exists !`})
    //         }

    //                 // Création du message
    //                 Post.create(req.body)
    //                     .then(post => res.json({ message: 'Post Created', data: post }))
    //                     .catch(error => res.status(500).json({ message: 'Database Error', error: error }))
    //             })
    //     .catch(error => res.status(500).json({ message: 'Database Error', error: error }))
    //-----------------------------------------------------------------------

// Modification du message
exports.updatePost = async (req, res) => {
    let postId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!postId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche du message et vérification
        let post = await Post.findOne({ where: { id: postId }, raw: true })
        if (post === null) {
            return res.status(404).json({ message: 'This message does not exist !' })
        }

        // Mise à jour du message
        await Post.update(req.body, { where: { id: postId } })
        return res.json({ message: 'Post Updated' })
    }catch(error){
        return res.status(500).json({ message: 'Database Error', error: error })
    }    
}

// Suppression du message (Hard Delete)
exports.deletePost = (req, res) => {
    let postId = parseInt(req.params.id)

    // Vérification du champ id
    if(!postId){
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    // Suppression du message
    Post.destroy({ where: { id: postId }, force: true })
        .then(() => res.status(204).json({ message: 'Post Deleted' }))
        .catch(error => res.status(500).json({ message: 'Database Error', error: error }))
}