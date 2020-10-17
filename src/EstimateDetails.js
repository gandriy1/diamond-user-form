import React from "react";
import { Table, Button, Modal } from "react-bootstrap";
import EstimateModel from "./EstimateModel";
import dateformat from "dateformat";
import { useHistory, useParams } from "react-router-dom";

import Config from "./Config";
import AppContext from './AppContext'

function EstimateDetails() {
  const appContext = React.useContext(AppContext);

  const [estimate, setEstimate] = React.useState({
    lineItemsSubtotal: 0,
    lineItems: [],
  });
  const [showSendModal, setShowSendModal] = React.useState(false);

  const history = useHistory();

  let { estimateId } = useParams();

  const getEstimate = () => {
    EstimateModel.getEstimate({ id: estimateId }, (serverEstimate) => {
      setEstimate({
        lineItemsSubtotal: getEstimateTotal(serverEstimate.lineItems),
        ...serverEstimate,
      });
    });
  };

  const getEstimateTotal = (lineItems) => {
    return lineItems.reduce((accumulator, item) => {
      return accumulator + item.quantity * item.rate;
    }, 0);
  };

  const handleClose = (link) => {
    if (link && typeof link === "string") window.location.href = link;

    setShowSendModal(false);
  };

  const openInJoist = () => {
    window.open(estimate.joistLink, "_blank");
  };

  React.useEffect(getEstimate, []);

  return (
    <>
      {appContext.context.user.isAdmin && (
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="card card-stats">
            <div className="card-header card-header-success card-header-icon">
              <div className="card-icon">
                <i className="material-icons">article</i>
              </div>
              <p className="card-category">{estimate.name}</p>
              <h4 className="card-title">${estimate.price}</h4>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons">eco</i> Material: $
                {estimate.lineItemsSubtotal}
              </div>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons">attach_money</i> Markup: $750
              </div>
            </div>
            <div className="card-footer">
              <div className="stats">
                <i className="material-icons">date_range</i> Date Sent:{" "}
                {dateformat(estimate.date, "dddd, mmmm dS")}
              </div>
            </div>
            <div className="card-footer">
              <div className="stats">
                <Button onClick={openInJoist}>Open In Joist</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header card-header-primary">
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <h4 className="card-title ">Items</h4>
            </div>
          </div>
        </div>
        <div className="card-body">
          <Table responsive>
            <thead className=" text-primary">
              <tr>
                <th>Name</th>
                <th>Qty + Rate</th>
                {appContext.context.user.isAdmin && <th>Price</th>}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {estimate.lineItems.map((lineItem, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {lineItem.name} <br /> {lineItem.description}
                    </td>
                    <td>
                      {lineItem.quantity} x ${lineItem.rate}
                    </td>
                    {appContext.context.user.isAdmin && <td>${lineItem.quantity * lineItem.rate}</td>}
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {appContext.context.user.isAdmin && <tr>
                <td></td>
                <td>Subtotal </td>
                <td>${estimate.lineItemsSubtotal}</td>
              </tr>}
              {appContext.context.user.isAdmin && <tr>
                <td></td>
                <td>Markup </td>
                <td>$750</td>
              </tr>}
              {appContext.context.user.isAdmin && <tr>
                <td></td>
                <td>Total </td>
                <td>${estimate.price}</td>
              </tr> }
            </tbody>
          </Table>
        </div>
      </div>

      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="card card-stats">
          <div className="card-header card-header-success card-header-icon">
            <div className="card-icon">
              <i className="material-icons">message</i>
            </div>
            <p className="card-category">20 Comments</p>
          </div>
          <div className="card-footer">
            <div className="stats">
              <Button
                onClick={() => {
                  setShowSendModal(true);
                }}
              >
                <i className="material-icons">send</i>Send
              </Button>
            </div>
          </div>
          <div className="card-footer">
            <div className="stats">
              <Button
                onClick={() => {
                  history.push(
                    Config.routesConfig.getEstimateComments(estimateId)
                  );
                }}
              >
                <i className="material-icons">comment</i>Comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showSendModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="primary"
            onClick={() => {
              handleClose("mailto:geaorge@gmail.com");
            }}
          >
            By Email
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose("sms:+16475302411");
            }}
            style={{ display: "block" }}
          >
            By SMS
          </Button>
          <Button variant="primary" onClick={handleClose}>
            More Options
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EstimateDetails;
