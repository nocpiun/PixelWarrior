const path = require("path");

const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
        libraryTarget: "umd",
        globalObject: "this"
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|ts)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: "ts-loader"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|ico|jpg)$/,
                exclude: /node_modules/,
                use: "file-loader"
            },
            {
                test: /\.(ttf|otf|woff|woff2)/,
                type: "asset/resource",
                dependency: { not: ["url"] }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.join(__dirname, "public"), to: path.join(__dirname, "build") }
            ]
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin({
            extractComments: false
        })]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "build")
        },
        compress: true,
        hot: true,
        open: true,
        port: 5000,
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    devtool: "source-map",
};
