import React, { Component } from "react";
import styled from 'styled-components'

const ErrorStyled = styled.h1`
    font-size: 17rem;
` 

class Error extends Component {
  render() {
    return (
        <ErrorStyled>
          Error 404
        </ErrorStyled>
    );
  }
}

export default Error;