import React, { Component } from "react";

class Note extends Component {
  render() {
    const { noteInput } = this.props;
    return (
      <ul className="noteList">
        {noteInput.map((val) => {
          return;
          <li className="eachNote" key={val.noteId}>
            {val.text}
          </li>;
        })}
      </ul>
    );
  }
}

export default Note;
