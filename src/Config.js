import React from 'react';

import AddLead from './AddLead';
import Routes from './Routes';
import Leads from './Leads';
import Login from './Login';

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
        label: "",
        link: "/login",
        icon: "",
        isVisibleInPanel: false,
        sidebarDisabled: true,
        component: <Login />
      }
    ],
    getLeadsLink: function(){return this.routes[1].link},
    getAddLeadLink: function(){return this.routes[2].link},
};

const Config = {
    routesConfig: routesConfig
};

export default Config;