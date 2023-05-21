import React from "react";
import { BrowserRouter } from "react-router-dom";
import MarketingApp from "./components/MarketingApp";
import Header from "./components/Header";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";

//This how we fix css classnames collisions we make sure we add this prefix
const generateClassName = createGenerateClassName({
    productionPrefix: "co",
});

export default () => {
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header />
                    <hr />
                    <MarketingApp />
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
};
