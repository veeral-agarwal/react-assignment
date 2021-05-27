import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/Users/UsersList'
import Register from './components/Common/Register'

import Navbar from './components/templates/Navbar'
import Applicant_navbar from './components/templates/Applicant_navbar'
import Login from './components/Common/Login'


class App extends React.Component{
  render(){
    let user_type = localStorage.getItem('user_type');
    let navbar = null;
    console.log(user_type);
    if(user_type === "applicant"){
      console.log("applicant");
      navbar = <Applicant_navbar/>;
    }
    else{
      console.log("lul");
      navbar = <Navbar/>
    }
    return (
      <Router>
        <div className="container">
          {navbar}
          <br/>
          <Route exact path="/" render={()=>{return <UsersList/>
            // if(user_type === "applicant"){
            //   console.log("111111");
            //   return <UsersList/>
            // }
            // else if(user_type === "recruiter"){
            //   return <Profileedit_recruiter/>
            // }
            // else{
            //   return <Login/>
            // }
          }} />
          
          <Route path="/users" exact component={UsersList}/>
          <Route path="/register" component={Register}/>
         
          <Route path="/login" component={Login}/>
          
        </div>
      </Router>
    );
  }
}

export default App;