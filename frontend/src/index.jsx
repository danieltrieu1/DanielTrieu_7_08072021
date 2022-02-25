import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom'

// import Error from './components/Error';
import Header from './components/Header';

// import Home from './pages/Home';
// import Login from './pages/Login';

 
ReactDOM.render(
    <React.StrictMode>
        <Router>
        <Header />
        </Router>
    </React.StrictMode>,
document.getElementById('root')
)

/* <Route path='/' component={Home} />
<Route path='/login' component={Login} />
<Route path="*" element={<Error />} /> */