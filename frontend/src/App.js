import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Signup from "./Components/SignupForm";
import Login from "./Components/LoginForm";
import Profile from "./Components/Profile";
import Dashboard from "./Components/Dashboard";
import FormPost from "./Components/FormPost";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Forum from "./Components/Forum";
import Error from "./Components/Error";

// import AuthService from "./services/auth.service";

class App extends Component {

  render() {

    return (
      <div className="App">
        <NavBar/>
        <div className="Container">
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
      </div>
    )
  }
}

export default App;
