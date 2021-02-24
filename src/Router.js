import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Polls from "./Polls";
import Poll from "./Poll";
import Header from "./Header";
import Footer from "./Footer";
import CreatePoll from "./CreatePoll";

export default function Router() {
  return (
    <BrowserRouter>
      <div className="site-container">
        <Header />
        <div className="w-full px-4 lg:w-main md:px-8 lg:px-0">
          <Switch>
            <Route exact path="/">
              <Polls />
            </Route>
            <Route path="/create">
              <CreatePoll />
            </Route>
            <Route path="/:id">
              <Poll />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
