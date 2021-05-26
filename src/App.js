import React from 'react';
import './App.css';
import Login from './Component/Login.js';
import User from './Component/User.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Particles from "react-particles-js";
import particleConfig from './Component/particleConfig.js';


function App() {
  
  return (
    <Router>
      <div className="app">
        <Particles className = "app__particles" params = {particleConfig} />
        
        <Switch>
          <Route path='/users'>
            <User />
          </Route>

          <Route path='/edit/:id'>
            <Login page = "edit" />
          </Route>

          <Route path='/'>
            <Login page = "register"/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
