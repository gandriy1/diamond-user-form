import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import Config from './Config'
import UserModel from './UserModel';
import AppContext from './AppContext'

function Login() {

  let [user, setUser] = React.useState({username:'', password:''});

  const history = useHistory();
  const appContext = React.useContext(AppContext);

  const setAttrValue = (attrName) => (event) => { 
    setUser({...user, [attrName]: event.target.value}); 
  };

  const submitLoginInfo = (event) => {
    event.preventDefault();
    UserModel.loginUser(user, (user)=>{
      if(user){
        history.push(Config.routesConfig.getLeadsLink());
        appContext.setContext({ user: {username: user.username, isAdmin: user.isAdmin} });
      }
      else
        window.DiamondApp.showInfoNotification("Invalid Username or Password");
    });
  };

  return (
    <Form onSubmit={submitLoginInfo}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="" value={user.username} onChange={setAttrValue("username")} />
      </Form.Group>

      <Form.Group controlId="formPassoword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder=""  value={user.password} onChange={setAttrValue("password")}/>
      </Form.Group>

      <div className="float-right">
        <Button variant="primary" type="submit">Login</Button>
      </div>
    </Form>
  );
}

export default Login;