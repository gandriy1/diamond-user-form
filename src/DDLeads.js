import React from "react";
import { Table } from "react-bootstrap";
import LeadsModel from "./LeadsModel";
import dateformat from "dateformat";
import { useHistory } from "react-router-dom";

import Config from './Config'

function DDLeads() {
  const [leads, setLeads] = React.useState([]);
  const history = useHistory();

  const getLeads = () => {
    LeadsModel.getLeads({}, (serverLeads) => {
      setLeads(serverLeads);
    });
  };

  const addLead = () => {
    history.push(Config.routesConfig.getAddLeadLink());
  };

  React.useEffect(getLeads, []);

  return (
    <div className="card">
      <div className="card-header card-header-primary">
        <div className="nav-tabs-navigation">
          <div className="nav-tabs-wrapper">            
            <h4 className="card-title ">Leads</h4>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button className="nav-link" onClick={addLead}> 
                  <i className="material-icons">note_add</i>
                  <span>Add Lead</span>
                  <div className="ripple-container"></div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body">
        <Table responsive>
          <thead className=" text-primary">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Visit Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => {
              return (
                <tr key={index}>
                  <td>{lead.name}</td>
                  <td>{lead.address}</td>
                  <td className="text-primary">
                    {dateformat(lead.visitDate, "dddd, mmmm dS")}
                  </td>
                  <td className="td-actions text-right">
                    <button
                      type="button"
                      rel="tooltip"
                      title="Edit Task"
                      className="btn btn-primary btn-link btn-sm"
                    >
                      <i className="material-icons">edit</i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default DDLeads;
