var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'specky.min.js',
    },
    module: {
        // loaders: [{
        //     test: /\.jsx?$/,
        //     exclude: /node_modules/,
        //     loader: 'babel-loader',
        // }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
}
