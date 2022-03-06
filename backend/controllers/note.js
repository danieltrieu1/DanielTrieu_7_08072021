const db = require('../db.config')
const Note = db.note

// Ensemble des commentaires
exports.getAllNotes = (req, res) => {
    Note.findAll()
        .then((note) => res.json(note))
        .catch( error => res.status(500).json({ message: 'Database Error', error: error }))
}
 
// Commentaire unique
exports.getNote = async (req, res) => {
    let noteId = parseInt(req.params.id)

    // Vérification du champs id
    if(!noteId){
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        
        // Récupération du commentaire
        let note = await Note.findOne({ where: { id: noteId }, raw: true })

        // Test si résultat null
        if (note === null) {
            return res.status(404).json({ message : 'This note does not exit !' })
    }

    // Renvoi du commentaire trouvé
    return res.json({ data: note }) 

    } catch (error) {
        res.status(500).json({ message: 'Database Error', error: error })
    }

}

// Création du commentaire
exports.createNote = async (req, res) => {
    const { user_id, content } = req.body

    // Validation des données reçues
    if (!user_id || !content) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si le commentaire existe
        // let note = await Note.findOne({ where: { content: content }, raw: true })

        let newNote = {
            // title: req.body.title,
            content: req.body.content,
            // user_id: req.body.user_id,
            PostId: parseInt(req.body.PostId),
          };
      
        Note.create(newNote)
        .then(() => {
            return res.json({ message: 'Note Created' })
        }) 
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error: error })
    }
}
    
// Modification du commentaire
exports.updateNote = async (req, res) => {
    let noteId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!noteId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche du commentaire et vérification
        let note = await Note.findOne({ where: { id: noteId }, raw: true })
        if (note === null) {
            return res.status(404).json({ message: 'This note does not exist !' })
        }

        // Mise à jour du commentaire
        await Note.update(req.body, { where: { id: noteId } })
        return res.json({ message: 'Note Updated' })
    }catch(error){
        return res.status(500).json({ message: 'Database Error', error: error })
    }    
}

// Suppression du commentaire (Hard Delete)
exports.deleteNote = (req, res) => {
    let noteId = parseInt(req.params.id)

    // Vérification du champ id
    if(!noteId){
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    // Suppression du commentaire
    Note.destroy({ where: {id: noteId}, force: true })
        .then(() => res.status(204).json({ message: 'Note Deleted' }))
        .catch(error => res.status(500).json({ message: 'Database Error', error: error }))
}