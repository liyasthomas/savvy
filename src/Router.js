import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Polls from "./Polls";
import Poll from "./Poll";
import Header from "./Header";
import Footer from "./Footer";
import CreatePoll from "./CreatePoll";
import About from "./About";

export default function Router() {
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center min-h-screen">
        <Header />
        <div className="container flex flex-1 px-4 py-8">
          <Switch>
            <Route exact path="/">
              <Polls />
            </Route>
            <Route path="/create">
              <CreatePoll />
            </Route>
            <Route path="/about">
              <About />
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
