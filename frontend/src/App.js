import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css'
import Signup from './Components/SignupForm'
import Login from './Components/LoginForm'
import Profile from './Components/Profile'

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className='Navbar'>
          <div className='NavbarLink'>
            <li >
              <Link to={"/login"} className='navLink'>login</Link>
            </li>
            <li className='navItem'>
              <Link to={'/signup'} className='navLink'>signup</Link>
            </li>
            <li className='navItem'>
              <Link to={'/profile'} className='navLink'>profile</Link>
            </li>
          </div>
        </nav>
        <div className='Container'>
          <Switch>
            <Route path='/signup' component={Signup} />
            <Route path={['/', "/login"]} component={Login} />
            <Route path='/profile' component={Profile} />
          </Switch>
        </div>
      </div>
    );
  }
} 
  
export default App;
