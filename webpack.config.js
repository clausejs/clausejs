var webpack = require('webpack');
// var ClosureCompilerPlugin = require('webpack-closure-compiler');

module.exports = {
    entry: './src/index.js',
    output: {
        library: 'speco',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        path: './dist',
        filename: 'speco.min.js',
    },
    module: {
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
      //   new ClosureCompilerPlugin({
      //    externs: 'src/index.js',
      //    compiler: {
      //      language_in: 'ECMASCRIPT6',
      //      language_out: 'ECMASCRIPT3',
      //      compilation_level: 'ADVANCED'
      //    },
      //    concurrency: 3,
      //  }),
    ]
}
