import React, { Component } from "react";
// import { Link } from "react-router-dom";
import styled from 'styled-components'

const ErrorStyled = styled.div`
    display: flex;
    justify-content: center;
    border: solid 3px red;
    background: white;
    width: 100%;
` 

class Error extends Component {
  render() {
    return (
        <ErrorStyled>
            <div className="errorContainer">
                <div className="errorBox">
                    404 ERROR
                </div>
            </div>
        </ErrorStyled>
    );
  }
}

export default Error;