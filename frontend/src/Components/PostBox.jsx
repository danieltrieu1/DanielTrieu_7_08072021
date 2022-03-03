import React, { Component } from 'react'

class PostBox extends Component {
  render() {
   const { postValue, handlePostValue, submitPostInput} = this.props;

  return (
    <div className="postBox">

    <input value={postValue}
      id="postInput" onChange={handlePostValue}
      type="text" placeholder="Rédiger un commentaire ..." />

    <button onClick={submitPostInput} type="submit"     
      className="postButtonSubmit">Post</button>
    </div>
   )}
  }

  export default PostBox;