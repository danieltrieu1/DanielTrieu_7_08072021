import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

class FormPost extends Component {
    constructor(props) {
        super(props)
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.state = {
          title: "",
          content: "",
          selectedFile: null,
          loading: false,
        }
    }

    onChangeTitle(e) {
        this.setState({ title: e.target.value });
    }
    onChangeContent(e) {
        this.setState({ content: e.target.value });
    }

    fileChangedHandler = event => {
        this.setState({ selectedFile: event.target.files[0] })
      }
      
      state = { selectedFile: null }
      
      uploadHandler = () => {
        axios.post('http://127.0.0.1:8080/', this.state.selectedFile)
      }



  render() {
    return (
        // <PostStyled>
            <div className="Container">
                <div className="card card-container">
                    <h2>Ecris une publication !</h2>
                        <div className="form-group">
                            <span>Ajouter un titre</span>
                            <input type='text' className='title' value={this.state.title}
                onChange={this.onChangeTitle}/>
                        </div>
                        <div className="form-group form-content">
                            <span>Contenu de la publication</span>
                            <input type='text' className='content' value={this.state.content}
                onChange={this.onChangeContent}/>
                        </div>
                        <div className="form-group">
                        <input type="file" onChange={this.fileChangedHandler}/>
                        <button onClick={this.uploadHandler}>Envoyer</button>
                        </div>
                </div>
            </div>
        // </PostStyled>
    );
  }
}

export default FormPost;