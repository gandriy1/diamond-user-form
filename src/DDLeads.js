import React from 'react';
import {Form, Button, Container, Alert, Spinner} from 'react-bootstrap';
import LeadsModel from './LeadsModel';

function DDLeads() {

  LeadsModel.getLeads({},()=>{},()=>{});

  return (
    <Container className="p-3">
      aa
    </Container>
  );
}

export default DDLeads;
