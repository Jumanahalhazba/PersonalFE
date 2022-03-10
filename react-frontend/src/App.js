import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import { useEffect } from 'react';
import Home from './components/Home';

function App() {
  useEffect(() => {
    fetch('http://localhost:8084/api/v1/login').then(resp => resp.text())
     .then(resp =>{
       console.log('Getting data from API'+resp);

    })
  }, [])

  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {Home}></Route>
                          {/* <Route path = "/" exact component = {ListEmployeeComponent}></Route> */}
                          <Route path = "/employees" component = {ListEmployeeComponent}></Route>
                          <Route path = "/add-employee/:id" component = {CreateEmployeeComponent}></Route>
                          <Route path = "/view-employee/:id" component = {ViewEmployeeComponent}></Route>
                          {<Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> }
                    </Switch>
                </div>
              <FooterComponent /> 
        </Router>s
    </div>
    
  );
}

export default App;
