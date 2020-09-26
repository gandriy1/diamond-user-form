import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {Form, Button, Container} from 'react-bootstrap';
import axios from 'axios';

//show success message, explore this.func and const a = () => {}
//figure out url config file for deployments

axios.defaults.baseURL = 'https://diamond-server.azurewebsites.net';

function App() {

  const [clientName, setClientName] = React.useState('');
  const [clientAddress, setClientAddress] = React.useState('');

  const submitClientForm = (event) => {
    event.preventDefault();
    let clientData = {name:clientName, address: clientAddress};
    console.log(clientData);

    setClientName("");
    setClientAddress("");

    axios.post('/addClient', clientData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    setClientName("");
    setClientAddress("");
  }

  return (
    <Container className="p-3">
      <Form onSubmit={submitClientForm}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" value={clientName} onChange={event => setClientName(event.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address or Intersection</Form.Label>
          <Form.Control as="textarea" placeholder="Enter your address or intersection" value={clientAddress} onChange={event => setClientAddress(event.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default App;
