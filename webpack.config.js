const SPECKY_EXTERN = 'S';

var webpack = require( 'webpack' );
// var ClosureCompilerPlugin = require('webpack-closure-compiler');
var PROD = JSON.parse( process.env.PROD_ENV || '0' );
var plugins = [
  new webpack.LoaderOptionsPlugin( {
    minimize: true,
    debug: false
  } )
];

if ( PROD ) {
  plugins.push( new webpack.optimize.UglifyJsPlugin( {
    compress: {
      warnings: true
    },
    output: {
      comments: false
    },
    sourceMap: false
  } ) );
}

module.exports = {
  entry: {
    'packages/specky/dist/specky': './src/index.js',
    'packages/specky-react/dist/specky-react': './src/react/index.js',
    'docs/bundle/specky-docsite': './docs/src/index.js',
  },
  output: {
    library: [ SPECKY_EXTERN ],
    libraryTarget: 'umd',
    path: './',
    filename: PROD ? '[name].min.js' : '[name].js',
  },
  externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'specky': {
      root: SPECKY_EXTERN,
      commonjs2: 'specky',
      commonjs: 'specky',
      amd: 'specky',
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  plugins: plugins,
}
