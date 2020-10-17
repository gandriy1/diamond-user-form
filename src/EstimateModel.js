//import axios from "axios";

const estimates = [
  {
    id: 1,
    name: "Georgiy",
    date: "2020-11-14T14:10:20.391Z",
    price: 1350,
    joistLink: "https://client.joistapp.com/estimates/01b9597102b0e7a564b0fe63",
    lineItems: [
      {
        name: "Interlock",
        description: 'Midnight Black - Flamed. 2"x48"-96"x12"-24"w',
        quantity: 50,
        rate: 12.5,
      },
      {
        name: "Keystone",
        description: 'Pier Caps Smooth Flat 16" x 16" x 2"',
        quantity: 10,
        rate: 44.78,
      },
    ],
  },
  {
    id: 2,
    name: "Ksenia",
    date: "2020-10-11T14:10:20.391Z",
    price: 2450,
    lineItems: [{ name: "Interlock", quantity: 100, rate: 12.5 }],
  },
];

function getEstimates(request, successCb, failCb) {
  const result = estimates.map(({ lineItems, ...keepAttr }) => keepAttr);
  setTimeout(() => {
    successCb(result);
  }, 500);
}

function getEstimate(request, successCb, failCb) {
  const result = estimates.find(
    (estimate) => estimate.id === parseInt(request.id)
  );
  setTimeout(() => {
    successCb(result);
  }, 500);
}

var Model = {
  getEstimates: getEstimates,
  getEstimate: getEstimate,
};

export default Model;
