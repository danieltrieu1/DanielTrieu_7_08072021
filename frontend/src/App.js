import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
// import styled from "styled-components";
// import wallpaper from "./assets/aq.jpeg";

import Signup from "./Components/SignupForm";
import Login from "./Components/LoginForm";
import Profile from "./Components/Profile";
import Dashboard from "./Components/Dashboard";
import FormPost from "./Components/FormPost";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Forum from "./Components/Forum";
import Error from "./Components/Error";

// const AppWrapper = styled.div`
//   display: flex;
//   justify-content: center;
// `

// const AppContainer = styled.div`
//     height: 100vh;
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     background-size: cover;
//     background: url(${wallpaper}) no-repeat;
//     // position: relative;

//     &:after {
//       // position: absolute;
//       // background: rgb(0,0,0);
//       // background: linear-gradient(-90deg, rgba(0,0,0,0) 0%, rgba(38, 83, 219, 0.278) 100%);
//       content: "";
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//     }
// `

class App extends Component {
  render() {
    return (
      // <AppWrapper>
      //     <AppContainer>
      <div>
        <NavBar />

        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/post" component={FormPost} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/forum" component={Forum} />

          <Route path="*" component={Error} />
        </Switch>
      </div>

      //     </AppContainer>
      // </AppWrapper>
    );
  }
}

export default App;
