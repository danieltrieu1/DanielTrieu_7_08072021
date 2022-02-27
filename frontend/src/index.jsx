import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' ;
// import axios from 'axios'

import Error from './components/Error';
import Header from './components/Header';
import Footer from './components/Footer';
import Users from './components/User/Card';
import Dashboard from './components/Dashboard';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';

// import GlobalStyle from './styles/GlobalStyle';

// const api = axios.create({
//   baseURL: `localhost:8080/users`
// })

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Dashboard />
      <Routes>
        <Route exact path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
      <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

