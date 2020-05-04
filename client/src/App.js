import React from "react";
import { Switch, Route } from "react-router-dom";
import { history } from "store/configureStore";
import { ConnectedRouter } from "connected-react-router";
import LandingPage from "components/views/LandingPage";
import LoginPage from "components/views/LoginPage";
import RegisterPage from "components/views/RegisterPage";
import Auth from "hoc/auth";

function App() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
