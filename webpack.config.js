const SPECKY_EXTERN = 'S';

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
    entry: {
      'dist/specky': './src/index.js',
      'dist/specky-react': './src/react/index.js',
    },
    output: {
        library: [SPECKY_EXTERN],
        libraryTarget: 'umd',
        umdNamedDefine: true,
        path: './packages/specky/dist',
        filename: PROD ? '[name].min.js' : '[name].js',
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "react": "React",
        "specky": SPECKY_EXTERN,
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
