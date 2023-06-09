const { merge } = require("webpack-merge");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const devConfig = {
    mode: "development",
    output: {
        //This need to be set on every sub project on dev mode to know where the main js file is located
        publicPath: "http://localhost:8081/",
    },
    devServer: {
        port: 8081,
        historyApiFallback: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            //Global to use inside container/consumer/shell
            name: "marketing",
            filename: "remoteEntry.js",
            exposes: {
                "./MarketingApp": "./src/bootstrap",
            },
            shared: packageJson.dependencies,
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};

module.exports = merge(commonConfig, devConfig);
