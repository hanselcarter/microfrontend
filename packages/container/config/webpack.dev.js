const { merge } = require("webpack-merge");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const packageJson = require("../package.json");

const devConfig = {
    mode: "development",
    output: {
        //This need to be set on every sub project on dev mode to know where the main js file is located
        publicPath: "http://localhost:8080/",
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            //This is the host name
            name: "container",
            remotes: {
                //remember this name has to match up with the one declared o exposed on our marketing app
                marketing: "marketing@http://localhost:8081/remoteEntry.js",
                auth: "auth@http://localhost:8082/remoteEntry.js",
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

module.exports = merge(commonConfig, devConfig);
