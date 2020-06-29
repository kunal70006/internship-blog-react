import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import { LandingPage } from "./Components";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
