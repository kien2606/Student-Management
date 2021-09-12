import "./App.css";

import { Route, Switch } from "react-router-dom";

import Admin from "./component/layout/Admin";
import LoginPage from "./features/auth/LoginPage";
import NotFound from "./component/common/NotFound";
import PrivateRoute from "./component/common/PrivateRoute";
import React from "react";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/admin" component={Admin} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
