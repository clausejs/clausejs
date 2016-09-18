var webpack = require('webpack');
// var ClosureCompilerPlugin = require('webpack-closure-compiler');

module.exports = {
    entry: './src/index.js',
    output: {
        library: 'specky',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        path: './dist',
        filename: 'specky.min.js',
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
