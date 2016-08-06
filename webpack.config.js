var path = require("path")
var webpack = require('webpack')

var isProd = process.env.NODE_ENV === 'production'

var config = {
    entry: {
        "date-utils": ["./src/dateUtils.js"],
    },
    externals: {
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: isProd ? "[name].min.js" : "[name].js",
        library: "date-utils",
        libraryTarget: "umd"
    },
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ["babel"],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    }
}

if (isProd) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            comments: false
        })
    )
}

module.exports = config
