import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import {NavBar, Navigation} from './UIComponents';
import DDAddLead from './DDAddLead';
import DDRoutes from './DDRoutes';
import DDLeads from './DDLeads';



const routesConfig = [
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
    component: <DDAddLead />
  }
]

ReactDOM.render(
  <React.StrictMode>  
    <Router>
      <Navigation routesConfig={routesConfig} />
      <div className="main-panel">
        <NavBar />
        <div className="content">
        <div className="container-fluid">
      <Switch>
        {routesConfig.map((route,index) => (
          <Route key={index} path={route.link}>
            {route.component}
          </Route>
        ))}
      </Switch>
      </div>
      </div>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);