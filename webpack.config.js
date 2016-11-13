var webpack = require('webpack');
// var ClosureCompilerPlugin = require('webpack-closure-compiler');
var PROD = JSON.parse(process.env.PROD_ENV || '0');

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
          query: {
            presets: ['es2015',
                {
                  plugins: [
                      'transform-es2015-template-literals',
                      'transform-es2015-literals',
                      'transform-es2015-function-name',
                      'transform-es2015-arrow-functions',
                      'transform-es2015-block-scoped-functions',
                      'transform-es2015-classes',
                      'transform-es2015-object-super',
                      'transform-es2015-shorthand-properties',
                      'transform-es2015-computed-properties',
                      'transform-es2015-for-of',
                      'transform-es2015-sticky-regex',
                      'transform-es2015-unicode-regex',
                      'check-es2015-constants',
                      'transform-es2015-spread',
                      'transform-es2015-parameters',
                      'transform-es2015-destructuring',
                      'transform-es2015-block-scoping',
                      'transform-es2015-typeof-symbol',
                      ['transform-regenerator', { async: false, asyncGenerators: false }],
                  ],
              }
            ],
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
