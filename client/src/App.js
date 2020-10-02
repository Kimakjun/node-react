import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";


import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {

  // option null => anybody
  //        true => login
  //        false => not login

  return (
    <Router>
      <Route exact path="/" component={Auth(LandingPage, null)}></Route>
      <Route exact path="/login" component={Auth(LoginPage, false)}></Route>
      <Route exact path="/register" component={Auth(RegisterPage, false)}></Route>
    </Router>
  )
}

export default App
