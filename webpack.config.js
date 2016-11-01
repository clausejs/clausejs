var webpack = require('webpack');
// var ClosureCompilerPlugin = require('webpack-closure-compiler');
var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
    entry: './src/index.js',
    output: {
        library: ['S'],
        libraryTarget: 'umd',
        umdNamedDefine: true,
        path: './dist',
        filename: PROD ? 'specky.min.js' : 'specky.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015'],
          },
        },
      ],
    },
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                keep_fnames: true,
            },
            mangle: {
                keep_fnames: true,
            },
            output: {
                comments: false,
            },
        }),
      //   new ClosureCompilerPlugin({
      //    externs: 'src/index.js',
      //    compiler: {
      //      language_in: 'ECMASCRIPT6',
      //      language_out: 'ECMASCRIPT3',
      //      compilation_level: 'ADVANCED'
      //    },
      //    concurrency: 3,
      //  }),
    ] : [],
}
