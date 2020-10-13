import React from 'react';

import DDAddLead from './DDAddLead';
import DDRoutes from './DDRoutes';
import DDLeads from './DDLeads';

const routesConfig = {
    routes: [
      {
        label: "Route Plan",
        link: "/routes",
        icon: "dashboard",
        component: <DDRoutes />
      },
      {
        label: "Leads",
        link: "/leads",
        icon: "content_paste",
        component: <DDLeads />
      },
      {
        label: "Add Lead",
        link: "/addLead",
        icon: "content_paste",
        isVisibleInPanel: false,
        component: <DDAddLead />
      }
    ],
    getLeadsLink: function(){return this.routes[1].link},
    getAddLeadLink: function(){return this.routes[2].link},
};

const Config = {
    routesConfig: routesConfig
};

export default Config;