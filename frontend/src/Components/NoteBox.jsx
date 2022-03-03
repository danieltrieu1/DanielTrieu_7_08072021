import React, { Component } from 'react'

class NoteBox extends Component {
  render() {
   const { noteValue, handleNoteValue, submitNoteInput} = this.props;

  return (
    <div className="noteBox">

    <textarea value={noteValue}
      id="noteInput" onChange={handleNoteValue}
      type="text" placeholder="Rédiger un commentaire ..." />

    <button onClick={submitNoteInput} type="submit"     
      className="noteButtonSubmit">Envoyer</button>
    </div>
   )}
  }

  export default NoteBox;