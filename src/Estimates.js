import React from "react";
import { Table } from "react-bootstrap";
import EstimateModel from "./EstimateModel";
import dateformat from "dateformat";
import { useHistory } from "react-router-dom";

import Config from './Config'
import AppContext from './AppContext'

function Estimates() {
  const appContext = React.useContext(AppContext);

  const [estimates, setEstimates] = React.useState([]);
  const history = useHistory();

  const getEstimates = () => {
    EstimateModel.getEstimates({}, (serverEstimates) => {
      setEstimates(serverEstimates);
    });
  };

  const goToEstimateDetails = (estimateId) => {
    history.push(Config.routesConfig.getEstimateDetails(estimateId));
  };

  React.useEffect(getEstimates, []);

  console.log(appContext.context);
  
  return (
    <div className="card">
      <div className="card-header card-header-primary">
        <div className="nav-tabs-navigation">
          <div className="nav-tabs-wrapper">            
            <h4 className="card-title ">Estimates</h4>
          </div>
        </div>
      </div>
      <div className="card-body">
        <Table responsive>
          <thead className=" text-primary">
            <tr>
              <th>Name</th>
              <th>Date Sent</th>
              { appContext.context.user.isAdmin && <th>Price</th> }
              <th></th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((estimate) => {
              return (
                <tr key={estimate.id}>
                  <td className="text-primary" onClick={() => goToEstimateDetails(estimate.id)}>{estimate.name}</td>
                  <td>{dateformat(estimate.date, "dddd, mmmm dS")}</td>
                  { appContext.context.user.isAdmin && <td>$ {estimate.price}</td> }
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Estimates;
