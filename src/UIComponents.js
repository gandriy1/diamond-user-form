import React from "react";

import { Link, useLocation } from "react-router-dom";

import Config from "./Config";
import AppContext from './AppContext'

function NavLinks(props) {
  const currentLocation = useLocation().pathname;
  const handleNavActiveClass = (linkLocation) => {
    return linkLocation === currentLocation ? "active" : "";
  };


  const linkPressed = window.DiamondApp.hideSidebar;
  const appContext = React.useContext(AppContext);
  /*data-image={process.env.PUBLIC_URL + "/img/sidebar-1.jpg"}*/

  return (
    <>
      {props.isVisible && (
        <div
          className="sidebar"
          data-color="purple"
          data-background-color="white"

        >
          <div className="logo">
            <Link to={Config.routesConfig.getUserConfigsLink()} className="simple-text logo-normal">
            <i className="material-icons">person</i> {appContext.context.user.username}
            </Link>
          </div>
          <div className="sidebar-wrapper">
            <ul className="nav">
              {Config.routesConfig.routes
                .filter((route) => {
                  return route.isVisibleInPanel !== false ? route : null;
                })
                .map((route, index) => (
                  <li
                    key={index}
                    className={"nav-item " + handleNavActiveClass(route.link)}
                  >
                    <Link to={route.link} className="nav-link" onClick={linkPressed}>
                      <i className="material-icons">{route.icon}</i>
                      <p>{route.label}</p>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

function NavBar(props) {
  return (
    <>
    { props.isVisible && (
    <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
      <div className="container-fluid">
        <div className="navbar-wrapper">
          <span className="navbar-brand"></span>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          aria-controls="navigation-index"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon icon-bar"></span>
          <span className="navbar-toggler-icon icon-bar"></span>
          <span className="navbar-toggler-icon icon-bar"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end">
          <form className="navbar-form"></form>
          <ul className="navbar-nav">
            <li className="">
              </li>
          </ul>
        </div>
      </div>
    </nav>)}
    </>
  );
}

function isRoutesMatch(staticRoute, currentRoute){
  return staticRoute.includes(':') ? staticRoute.split('/')[1] === currentRoute.split('/')[1] : staticRoute === currentRoute;
}

export function Navigation(props) {
    const currentLocation = useLocation().pathname;

    const isShowSidebarForCurrentRoute = () => {
        const currentRoute = Config.routesConfig.routes.find(
            (route) => isRoutesMatch(route.link, currentLocation)
        );
        
        return currentRoute.sidebarDisabled !== true;
    };

  return (
    <>
      <NavLinks isVisible={isShowSidebarForCurrentRoute()} />
      <div className="main-panel">
        <NavBar isVisible={isShowSidebarForCurrentRoute()} />
        <div className="content">{props.children}</div>
      </div>
    </>
  );
}

export default { Navigation };
