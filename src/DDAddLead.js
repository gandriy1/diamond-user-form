import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import Config from './Config'
import LeadsModel from './LeadsModel';

function ClientForm(props){
  const emptyClientInfo =   { name: "Vladimir", address: "268 Brighton Ave, Toronto", visitDate:"", phone: "(647)556-0949", email: "", extraInfo:""};

  let [clientInfo, setClientInfo] = React.useState(emptyClientInfo);

  const submitClientForm = (event) => {
    event.preventDefault();
    props.onFinish(clientInfo);
  }
  
  const setAttrValue = (attrName) => (event) => { 
    setClientInfo({...clientInfo, [attrName]: event.target.value}); 
  }

  return (
      <Form onSubmit={submitClientForm}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="" value={clientInfo.name} onChange={setAttrValue("name")} />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" placeholder="" value={clientInfo.address} onChange={setAttrValue("address")}/>
        </Form.Group>

        <Form.Group controlId="formVisitDate">
          <Form.Label>Visit Date</Form.Label>
          <input type="date" id="formVisitDate" className="form-control" value={clientInfo.visitDate} onChange={setAttrValue("visitDate")}/>
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="number" placeholder="" value={clientInfo.phone}  onChange={setAttrValue("phone")}/>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="" value={clientInfo.email}  onChange={setAttrValue("email")}/>
        </Form.Group>

        <Form.Group controlId="formExtraInfo">
          <Form.Label>Extra Info</Form.Label>
          <Form.Control as="textarea" placeholder="Type of work" value={clientInfo.extraInfo} onChange={setAttrValue("extraInfo")}/>
        </Form.Group>

        <div className="float-right">
          <Button variant="primary" type="submit">Submit</Button>
        </div>
      </Form>
  );
}

function App() {

  const history = useHistory();

  const processFormData = (clientInfo) => {
    var parts = clientInfo.visitDate.split("-");
    const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    clientInfo.visitDate = dateObj.toISOString();

    LeadsModel.addLead(clientInfo, ()=>{
      window.DiamondApp.showInfoNotification("Client Added");
      history.push(Config.routesConfig.getLeadsLink());
    });
  }

  return (
      <ClientForm onFinish={processFormData}/>
  );
}

export default App;
