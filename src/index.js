import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";

import Config from "./Config";
import { NavBar, Navigation } from "./UIComponents";

function LoadingView(props) {
  return (
    <div style={{ position: "absolute", zIndex: 999 }}>
      <Spinner animation="border" variant="success" />
      {/*<Button onClick={props.onCancel} variant="outline-danger">Cancel</Button>*/}
    </div>
  );
}

function App() {
  return (
    <>
      <LoadingView />
      <Router>
        <Navigation routesConfig={Config.routesConfig.routes} />
        <div className="main-panel">
          <NavBar />
          <div className="content">
            <div className="container-fluid">
              <Switch>
                {Config.routesConfig.routes.map((route, index) => (
                  <Route key={index} path={route.link}>
                    <Container>{route.component}</Container>
                  </Route>
                ))}
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
