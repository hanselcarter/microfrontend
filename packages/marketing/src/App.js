import React from "react";

import { Switch, Route, Router } from "react-router-dom";

import { StylesProvider, createGenerateClassName } from "@material-ui/core";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

//This how we fix css classnames collisions we make sure we add this prefix
const generateClassName = createGenerateClassName({
    productionPrefix: "ma",
});

export default ({ history, user }) => {
    React.useEffect(() => {
        const fetchData = async () => {
            await user();
        };

        fetchData();
    }, [user]);

    return (
        <div>
            <StylesProvider generateClassName={generateClassName}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/pricing" component={Pricing} />
                        <Route path="/" component={Landing} />
                    </Switch>
                </Router>
            </StylesProvider>
        </div>
    );
};
