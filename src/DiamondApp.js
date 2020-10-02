import React from 'react';
import './App.css';
import {Form, Button, Container, Alert} from 'react-bootstrap';
import axios from 'axios';

//show success message, explore this.func and const a = () => {}
//figure out url config file for deployments
//loading screen while submitting

axios.defaults.baseURL = 'https://diamond-server.azurewebsites.net';

function ClientForm(props){
  //const emptyClientInfo = {name:'', address:'', phone: '', extraInfo:''};
  const emptyClientInfo = {name:'Josh', address:'19 Mb', phone: '647', extraInfo:'none'};

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
          <Form.Control type="text" placeholder="Name" value={clientInfo.name} onChange={setAttrValue("name")} />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" placeholder="Address or intersection" value={clientInfo.address} onChange={setAttrValue("address")}/>
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="number" placeholder="Phone #" value={clientInfo.phone}  onChange={setAttrValue("phone")}/>
        </Form.Group>

        <Form.Group controlId="formExtraInfo">
          <Form.Label>Extra Info</Form.Label>
          <Form.Control as="textarea" placeholder="Email, type of work, visit date" value={clientInfo.extraInfo} onChange={setAttrValue("extraInfo")}/>
        </Form.Group>

        <div className="float-right">
          <Button variant="primary" type="submit">Submit</Button>
        </div>
      </Form>
  );
}

function SubmitStatus(props){
  return (
    <Alert variant="success">
      <Alert.Heading>Client {props.clientName} was added</Alert.Heading>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={props.onFinish} variant="outline-success">Back</Button>
        </div>
    </Alert>
  );
}

let nameOfAddedClient = "";
function App() {
  let [showFormSubmittedStatus, setShowFormSubmittedStatus] = React.useState(false);

  const processFormData = (clientInfo) => {
    let serverReqBody = {name:clientInfo.name, address: clientInfo.address, phone: clientInfo.phone, extraInfo: clientInfo.extraInfo};
    console.log(serverReqBody);

    nameOfAddedClient =  clientInfo.name;
    setShowFormSubmittedStatus(true);

    axios.post('/addClient', serverReqBody)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const backToForm = () => {
    setShowFormSubmittedStatus(false);
  }

  return (
    <Container className="p-3">
      { showFormSubmittedStatus ? <SubmitStatus onFinish={backToForm} clientName={nameOfAddedClient} /> : <ClientForm onFinish={processFormData}/> }
    </Container>
  );
}

export default App;
