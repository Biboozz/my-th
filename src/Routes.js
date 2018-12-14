import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import Home from "./containers/Home";
import e404 from "./containers/e404"
import Manage from "./containers/Manage";
import requireAuth from "./components/requireAuth";
import LoginPage from "./containers/loginPage";
import Features from "./containers/features";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" name="Root" exact component={Home}/>
            <Route path="/(.*/)?index.html" name="Index" exact render={() => <Redirect to="/"/>}/>
            <Route path="/features" name="Features" component={Features}/>
            <Route path="/manage" name="Manage" component={requireAuth(Manage)}/>
            <Route path="/login" name="Login" component={LoginPage}/>
            <Route component={e404}/>
        </Switch>
    )
}