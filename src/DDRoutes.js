import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import LeadsModel from "./LeadsModel";

axios.defaults.baseURL = "https://diamond-server.azurewebsites.net";

const urlRoutePrefix =
  "https://www.google.com/maps/dir/?api=1&origin=197%20Anthony%20Ln%2C%20Concord&destination=197%20Anthony%20Ln%2C%20Concord&travelmode=driving&waypoints=";
  
function App() {
  let [clients, setClients] = useState([]);
  let [mapUrl, setMapUrl] = useState("http://google.com");

  const fetchUsers = () => {
    LeadsModel.getLeads({}, (serverLeads) => {
      setClients(serverLeads);
    });

    generateMap();
  };

  const onItemClick = (index) => {
    let clientToUpdate = [...clients];
    let client = { ...clientToUpdate[index] };
    client.deselected = client.deselected ? false : true;
    clientToUpdate[index] = client;
    setClients(clientToUpdate);
    clients = clientToUpdate;
    generateMap();
  };

  const generateMap = () => {
    let newMapUrl = clients
      .filter((client) => !client.deselected)
      .reduce((url, client, idx) => {
        return (
          url + (idx === 0 ? "" : "|") + encodeURIComponent(client.address)
        );
      }, urlRoutePrefix);
    setMapUrl(newMapUrl);
  };

  useEffect(fetchUsers, []);

  return (
    <>
      <ListGroup as="ul">
        {clients.map((client, index) => {
          return (
            <ListGroup.Item
              key={index}
              active={!client.deselected}
              as="li"
              onClick={() => onItemClick(index)}
            >
              <p className="h6">{client.name}</p>
              <p>{client.address}</p>
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      <div className="mt-3 float-right">
        <Button variant="success" href={mapUrl} target="_blank">
          Open Maps
        </Button>
      </div>
    </>
  );
}

export default App;
