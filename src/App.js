import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from "axios";
import FormKYC from "./container/formKYC" 
import {BrowserRouter as Router , Route} from "react-router-dom";
import FormFilled from './container/FormFilled/FormFilled'
class App extends React.Component  {
  state={
    data:[]
  }
  render() {
    
  return (
    <div className="App">
      {/* <div className="form" >
      <h2>Form</h2>
      <form method="POST">
        
        <div className="input">
        <input name="name" placeholder="Name"/><br/>
        </div>
        <div className="input">
      <input name = "address" placeholder="Address"/><br/>
        </div>
        <button type="submit">
          save
        </button>
      </form>
      </div>
       */}
       <Router>
         
        <Route path="/" exact > <FormKYC data={this.state.data}/></Route>
        <Route path="/form-filled"> <FormFilled data={this.state.data}/></Route>
       </Router>
    </div>
  
  );
      }
}

export default App;
