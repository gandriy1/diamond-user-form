import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Config from "./Config";
import { Navigation } from "./UIComponents";
import { AppContext } from "./AppContext";

/*function LoadingView(props) {
  return (
    <div style={{ position: "absolute", zIndex: 999 }}>
      <Spinner animation="border" variant="success" />
      <Button onClick={props.onCancel} variant="outline-danger">Cancel</Button>
    </div>
  );
}*/


function App() {
  return (
    <>
      {/* <LoadingView /> */}
      <Router>
        <Switch>
          {Config.routesConfig.routes.map((route, index) => (
            <Route key={index} path={route.link}>
              <AppContext.Provider value={{username:'user'}}>
                <Navigation>
                  <Container>{route.component}</Container>
                </Navigation>
              </AppContext.Provider>
            </Route>
          ))}
        </Switch>
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
