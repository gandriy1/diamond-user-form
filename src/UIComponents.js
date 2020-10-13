import React from 'react';

import {
    Link, useLocation
} from 'react-router-dom'

export function Navigation(props){

    const currentLocation = useLocation().pathname;
    const handleNavActiveClass = (linkLocation) => {return linkLocation === currentLocation ? "active" : "";}

    return (
        <div className="sidebar" data-color="purple" data-background-color="white" data-image={process.env.PUBLIC_URL +"/img/sidebar-1.jpg"}>
            <div className="logo">
                <Link to="/" className="simple-text logo-normal">Home</Link>
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                {props.routesConfig.filter((route)=>{return route.isVisibleInPanel !== false ? route : null;}).map((route, index)=>(
                    <li key={index} className={'nav-item ' +handleNavActiveClass(route.link)}>
                        <Link to={route.link} className="nav-link">
                        <i className="material-icons">{route.icon}</i>
                        <p>{route.label}</p>
                        </Link>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}

export function NavBar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div className="container-fluid">
            <div className="navbar-wrapper">
            <span className="navbar-brand">Dashboard</span>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end">
            <form className="navbar-form">
            </form>
            <ul className="navbar-nav">
            </ul>
            </div>
        </div>
        </nav>
    )
}

export default {Navigation, NavBar};