import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/Home'
 
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Route>
                <Home />
            </Route>
        </Router>
    </React.StrictMode>,
document.getElementById('root')
)