import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyRouter from "../MyRouter";
export default class RouterComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            router: MyRouter
        }
    }

    render() {
        var routers = this.state.router.map((item, key) => {
            return <Route key={key} exact path={item.path} component={item.component} />
        });

        return (
            <Router>
                <Switch>
                    {routers}
                </Switch>
            </Router>
        )
    }
}