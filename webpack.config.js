var webpack = require('webpack');
// var ClosureCompilerPlugin = require('webpack-closure-compiler');
var PROD = JSON.parse(process.env.PROD_ENV || '0');
var plugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  })
];

if(PROD) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true
    },
    output: {
      comments: false
    },
    sourceMap: false
  }));
}

module.exports = {
    entry: './src/index.js',
    output: {
        library: ['S'],
        libraryTarget: 'umd',
        umdNamedDefine: true,
        path: './packages/specky/dist',
        filename: PROD ? 'specky.min.js' : 'specky.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
        },
      ],
    },
    plugins: plugins,
}
