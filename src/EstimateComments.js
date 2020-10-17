import React from "react";
import { Table, Form, Button } from "react-bootstrap";
const comments = [
  {
    author: "Rubin",
    text: "We need to buy materials tomorrow for this",
  },
  {
    author: "Alexei",
    text: "Beaver Valley",
  },
  {
    author: "Alexei",
    text: "Can you pick me up on the way?",
  },
  {
    author: "Alexei",
    text: "And grab double double",
  },
  {
    author: "Rubin",
    text: "Ok",
  },
];

function EstimateComments() {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <Table responsive>
            <tbody>
              {comments.map((comment, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="form-check">
                        <label className="form-check-label">
                          <span className="form-check-sign">
                            <i className="material-icons">person_pin</i>
                            {comment.author}
                          </span>
                        </label>
                      </div>
                    </td>
                    <td>{comment.text}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <Form>
            <Form.Group controlId="formExtraInfo">
              <Form.Control as="textarea" placeholder="Write Comment" />
            </Form.Group>

            <div className="float-right">
              <Button variant="primary" type="submit">
                Send
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EstimateComments;
