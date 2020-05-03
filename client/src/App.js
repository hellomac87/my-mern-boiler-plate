import React from "react";
import { Switch, Route } from "react-router-dom";
import { history } from "store/configureStore";
import { ConnectedRouter } from "connected-react-router";
import LandingPage from "components/views/LandingPage";
import LoginPage from "components/views/LoginPage";
import RegisterPage from "components/views/RegisterPage";

function App() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
