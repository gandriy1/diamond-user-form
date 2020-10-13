import axios from "axios";

axios.defaults.baseURL = "https://diamond-server.azurewebsites.net";

const leads = [
  { name: "Yana", address: "18 Brightbay Crescent, Thornhill", visitDate:"2020-11-14T14:10:20.391Z", phone: "(647)658-5466", email: "yana@gmail.com", extraInfo:""},
  { name: "Vasiliy", address: "116 Hollywood Ave, North York", visitDate:"2020-11-17T14:10:20.391Z", phone: "(647)756-2557", email: "vasily@gmail.com",  extraInfo:""},
  { name: "Svetlana", address: "350 St Germain Ave, Toronto", visitDate:"2020-12-01T14:10:20.391Z", phone: "(647)446-7543", email: "svetland90@gmail.com",  extraInfo:""},
];

function getLeads(request, successCb, failCb) {
    setTimeout(()=>{successCb(leads);}, 1000);
    
  /*
    axios.post('/addClient', request)
    .then(function (response) {
        successCb(response);
    })
    .catch(function (error) {
        failCb(error);
    });
    */
}

function addLead(request, successCb, failCb) {
    leads.push(request);
    console.log(leads);
    setTimeout(successCb, 1000);
  /*
    axios.post('/addClient', request)
    .then(function (response) {
        successCb(response);
    })
    .catch(function (error) {
        failCb(error);
    });
    */
}

var Model = {
  getLeads: getLeads,
  addLead: addLead
};

export default Model;
