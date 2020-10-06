import React from 'react';
import {Form, Button, Container, Alert, Spinner} from 'react-bootstrap';
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
    <Alert variant="info">
      <Alert.Heading>Client {props.clientName} was added</Alert.Heading>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={props.onFinish} variant="outline-primary">Back</Button>
        </div>
    </Alert>
  );
}

function LoadingView(props){
  return (
    <>
      <Spinner animation="border" variant="success" />
      <Button onClick={props.onCancel} variant="outline-danger">Cancel</Button>
    </>
  )
}

let nameOfAddedClient = "";
const FORM_STATE = { DISPLAY_FORM: 1, SUBMIT_IN_PROGRESS: 2, FORM_SUBMITTED: 3}
function App() {
  let [formState, setFormState] = React.useState(FORM_STATE.DISPLAY_FORM);
  let cancelRequestId = React.useRef(0);

  const processFormData = (clientInfo) => {
    let serverReqBody = {name:clientInfo.name, address: clientInfo.address, phone: clientInfo.phone, extraInfo: clientInfo.extraInfo};
    console.log(serverReqBody);

    nameOfAddedClient =  clientInfo.name;
    setFormState(FORM_STATE.SUBMIT_IN_PROGRESS);

    /*axios.post('/addClient', serverReqBody)
    .then(function (response) {
      console.log(response);
      setFormState(FORM_STATE.FORM_SUBMITTED);
    })
    .catch(function (error) {
      console.log(error);
      setFormState(FORM_STATE.FORM_SUBMITTED);
    });*/
    cancelRequestId.current = setTimeout(()=>{setFormState(FORM_STATE.FORM_SUBMITTED);}, 3000);
  }

  const backToForm = () => {
    setFormState(FORM_STATE.DISPLAY_FORM);
  }

  const cancelServerRequest = () => {
    clearTimeout(cancelRequestId.current); 
    setFormState(FORM_STATE.DISPLAY_FORM);
  }
  
  const getCurrentView = function() {
    switch(formState) {
      case FORM_STATE.DISPLAY_FORM: return (<ClientForm onFinish={processFormData}/>);
      case FORM_STATE.SUBMIT_IN_PROGRESS: return (<LoadingView onCancel={cancelServerRequest} />);
      case FORM_STATE.FORM_SUBMITTED: return (<SubmitStatus onFinish={backToForm} clientName={nameOfAddedClient} />);
    }
  }
  return (
    <Container className="p-3">
      {getCurrentView()}
    </Container>
  );
}

export default App;
