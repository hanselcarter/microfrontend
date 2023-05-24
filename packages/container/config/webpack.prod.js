const { merge } = require("webpack-merge");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
        //This public path is to append it to file name because on the s3 buck our build is under the path below
        publicPath: "/container/latest/",
    },
    plugins: [
        new ModuleFederationPlugin({
            //This is the host name
            name: "container",
            remotes: {
                //remember this name has to match up with the one declared o exposed on our marketing app
                //remote will be located at the same domain of the other apps but lets assume we will locate it a /marketing subdomain
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
                auth: `marketing@${auth}/marketing/latest/remoteEntry.js`,
            },
            //Big modules like react we should only load one copy, make sure both apps run the same version,
            //this can also be enforce by using singleton prop also this can be delegated to webpack but you might want very specific and use this manual way too
            // shared: ["react", "react-dom"],

            //Delegated way,
            shared: packageJson.dependencies,
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);
