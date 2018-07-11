import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, loginUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { clearCurrentProfile } from "./actions/profileActions";

import "./App.css";

//check for token 
if(localStorage.jwtToken){
  //set auth token header
  setAuthToken(localStorage.jwtToken)
  //decode token and get user info
  const decoded= jwt_decode(localStorage.jwtToken)
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  //Check for exp token
  const currentTime= Date.now()/100;
  if(decoded.exp<currentTime){
    //logout
    store.dispatch(loginUser())
    //Clear current Profile
    store.dispatch(clearCurrentProfile())
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
