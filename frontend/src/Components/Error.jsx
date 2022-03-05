import React, { Component } from "react";
import styled from 'styled-components'

const ErrorStyled = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    // border: solid 3px red;
    background-image: url('././assets/istockphoto-1149316411-612x612.jpeg')
    background: white;
    height: 100vh;
    width: 100%;
` 

class Error extends Component {
  render() {
    return (
        <ErrorStyled>
            <div className="errorContainer">
                <div className="errorBox">
                </div>
            </div>
        </ErrorStyled>
    );
  }
}

export default Error;