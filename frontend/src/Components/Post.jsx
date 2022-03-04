import React, { Component } from "react";

class Post extends Component {
  render() {
    const { postInput } = this.props;
    return (
      <ul className="postList">
        {postInput.map((val) => {
          return;
          <li className="eachPost" key={val.postId}>
            {val.text}
          </li>;
        })}
      </ul>
    );
  }
}

export default Post;
