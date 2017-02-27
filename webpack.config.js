const CLAUSEJS_EXTERN = 'C';
const path = require( 'path' );

var webpack = require( 'webpack' );
// var ClosureCompilerPlugin = require('webpack-closure-compiler');
var MINIFY_ME = JSON.parse( process.env.MINIFY_ME || '0' );
var CLAUSEJS_ENV = process.env.CLAUSEJS_ENV;

var plugins = [
  new webpack.DefinePlugin( {
    'CLAUSEJS_INTERNAL_DEV': JSON.stringify( CLAUSEJS_ENV !== 'production' )
  } ),
  new webpack.LoaderOptionsPlugin( {
    minimize: true,
    debug: false
  } )
];

if ( MINIFY_ME ) {
  plugins.push( new webpack.optimize.UglifyJsPlugin( {
    compress: {
      warnings: true,
    },
    mangle: {
      keep_fnames: true
    },
    output: {
      comments: false
    },
    sourceMap: false
  } ) );
}

module.exports = {
  entry: {
    'packages/clausejs/dist/clausejs': './src/index.ts',
    // 'packages/clausejs-gen/dist/clausejs-gen': './src/gen/index.ts',
    // 'packages/clausejs-docgen/dist/clausejs-docgen': './src/docgen/index.ts',
    // 'packages/clausejs-react/dist/clausejs-react': './src/react/index.ts',
    // 'docs/bundle/functional': './docs/src/functional.ts',
    // 'docs/bundle/content': './docs/src/content.ts',
  },
  output: {
    library: [ CLAUSEJS_EXTERN ],
    libraryTarget: 'umd',
    path: __dirname,
    filename: MINIFY_ME ? '[name].min.js' : '[name].js',
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
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: [
          'awesome-typescript-loader',
        ],
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  plugins: plugins,
}
