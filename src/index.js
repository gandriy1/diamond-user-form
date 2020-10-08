import React from 'react';
import ReactDOM from 'react-dom';

import DiamondApp from './DiamondApp';
import AdminApp from './AdminApp';

import {
    BrowserRouter as Router,
    Switch, Route, Link, useLocation
} from 'react-router-dom'

//function a(){return <div>{"useLocation().pathname"}</div>}
//{a()}

function Navigation(props){

  const currentLocation = useLocation().pathname;
  const handleNavActiveClass = (linkLocation) => {return linkLocation === currentLocation ? "active" : "";}

  return (
    <div>
      <div className="sidebar" data-color="purple" data-background-color="white" data-image={process.env.PUBLIC_URL +"/img/sidebar-1.jpg"}>
          <div className="logo">
            <Link to="/" className="simple-text logo-normal">Home</Link>
          </div>
          <div className="sidebar-wrapper">
            <ul className="nav">
              <li className={'nav-item ' +handleNavActiveClass('/leads')}>
                <Link to="/leads" className="nav-link">
                  <i className="material-icons">content_paste</i>
                  <p>Leads</p>
                </Link>
              </li>
              <li className={'nav-item ' +handleNavActiveClass('/addClient')}>
                <Link to="/addClient" className="nav-link">
                  <i className="material-icons">dashboard</i>
                  <p>Route Plan</p>
                </Link>
              </li>
            </ul>
          </div>
      </div>
    </div>
  );
}

ReactDOM.render(

  <React.StrictMode>  
    <Router>
      <Navigation />
      <Switch>
        <Route path="/leads">
          <AdminApp />
        </Route>
        <Route path="/addClient">
          <DiamondApp />
        </Route>
        <Route path="/">
          <div>Home</div>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);