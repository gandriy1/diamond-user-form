import React from 'react';
import {Container} from 'react-bootstrap';
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
