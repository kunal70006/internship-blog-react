import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import { LandingPage, Create, Show, Edit } from "./Components";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/show" component={Show} />
          <Route exact path="/edit" component={Edit} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
