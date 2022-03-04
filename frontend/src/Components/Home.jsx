import React, { Component } from "react";
import styled from "styled-components";

const PageWrapper = styled.div``;

const Container = styled.div`
  background-image: url('./assets/icon-left-font-monochrome-white.png')
  background-color: orange;
  width: 100%;
  height: 100vh;
`


class Home extends Component {
  render() {
    return (
      <PageWrapper>
        <Container>
        <div></div>
        </Container>
      </PageWrapper>
    );
  }
}

export default Home;
