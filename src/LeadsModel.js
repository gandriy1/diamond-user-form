import axios from 'axios';

axios.defaults.baseURL = 'https://diamond-server.azurewebsites.net';

function getLeads(request, successCb, failCb){
    axios.post('/addClient', request)
    .then(function (response) {
        successCb(response);
    })
    .catch(function (error) {
        failCb(error);
    });
}


var Model = {
    getLeads: getLeads
}

export default Model;
