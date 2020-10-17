import axios from "axios";

axios.defaults.baseURL = "https://diamond-server.azurewebsites.net";

const users = [
  { username: "Rubin", password: "1", isAdmin: true},
  { username: "Alexei", password: "1", isAdmin: false },
];

function loginUser(request, successCb, failCb) {
  const user = users.find(user => user.username.toLowerCase() === request.username.toLowerCase());
  setTimeout(() => {
    successCb(user);
  }, 1000);
}

var Model = {
  loginUser: loginUser
};

export default Model;
