const { merge } = require("webpack-merge");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const packageJson = require("../package.json");

const devConfig = {
    mode: "development",
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
