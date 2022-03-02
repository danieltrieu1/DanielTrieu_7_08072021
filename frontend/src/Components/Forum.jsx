import React, { Component } from "react";
// import { Link } from "react-router-dom";
import styled from 'styled-components'

const ForumStyled = styled.div`
    display: flex;
    justify-content: center;
    border: solid 3px red;
    background: white;
` 

class Forum extends Component {
  render() {
    return (
        <ForumStyled>

            <div className="Container">
                <div className="forumBox">
                    <div className="Post">
                    </div>                
                </div>
            </div>


        </ForumStyled>
    );
  }
}

export default Forum;