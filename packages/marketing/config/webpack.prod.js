const { merge } = require("webpack-merge");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const packageJson = require("../package.json");

const prodConfig = {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
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

module.exports = merge(commonConfig, prodConfig);
