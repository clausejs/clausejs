const CLAUSEJS_EXTERN = 'C';

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
    'packages/clausejs/dist/clausejs': './src/index.js',
    'packages/clausejs-gen/dist/clausejs-gen': './src/gen/index.js',
    'packages/clausejs-docgen/dist/clausejs-docgen': './src/docgen/index.js',
    'packages/clausejs-react/dist/clausejs-react': './src/react/index.js',
    'docs/bundle/functional': './docs/src/functional.js',
    'docs/bundle/content': './docs/src/content.js',
  },
  output: {
    library: [ CLAUSEJS_EXTERN ],
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
    'clausejs': {
      root: CLAUSEJS_EXTERN,
      commonjs2: 'clausejs',
      commonjs: 'clausejs',
      amd: 'clausejs',
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  plugins: plugins,
}
