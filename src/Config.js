import React from 'react';

import AddLead from './AddLead';
import Routes from './Routes';
import Leads from './Leads';
import Login from './Login';
import Estimates from './Estimates';
import Logout from './Logout';
import EstimateDetails from "./EstimateDetails";
import EstimateComments from "./EstimateComments";

const routesConfig = {
    routes: [
      {
        label: "Route Plan",
        link: "/routes",
        icon: "dashboard",
        component: <Routes />
      },
      {
        label: "Leads",
        link: "/leads",
        icon: "content_paste",
        component: <Leads />
      },
      {
        label: "",
        link: "/addLead",
        icon: "",
        isVisibleInPanel: false,
        component: <AddLead />
      },
      {
        label: "Estimates",
        link: "/estimates",
        icon: "work",
        component: <Estimates />
      },
      {
        label: "",
        link: "/estimateDetails/:estimateId",
        icon: "",
        isVisibleInPanel: false,
        component: <EstimateDetails />
      },
      {
        label: "",
        link: "/estimateComments/:estimateId",
        icon: "",
        isVisibleInPanel: false,
        component: <EstimateComments />
      },
      {
        label: "",
        link: "/user",
        icon: "",
        isVisibleInPanel: false,
        component: <Login />
      },
      {
        label: "Logout",
        link: "/logout",
        icon: "login",
        isVisibleInPanel: true,
        sidebarDisabled: false,
        component: <Logout />
      },
      {
        label: "",
        link: "/",
        icon: "",
        isVisibleInPanel: false,
        sidebarDisabled: true,
        component: <Login />
      }
    ],
    getLeadsLink: function(){return "/leads"},
    getAddLeadLink: function(){return "/addLead"},
    getUserConfigsLink: function(){return "/user"},
    getLoginLink: function(){return "/"},
    getEstimateDetails: function(estimateId){return `/estimateDetails/${estimateId}`},
    getEstimateComments: function(estimateId){return `/estimateComments/${estimateId}`},
};

const Config = {
    routesConfig: routesConfig
};

export default Config;