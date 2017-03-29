const basePath = './app';
const entryTsxPath = basePath + '/app.tsx';
const entryScssPath = basePath + '/app.scss';
const outputBasePath = './dist';
const outputFileName = 'js/bundle.js';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: [
      entryTsxPath,
      entryScssPath
    ],
    vendor: [
      './node_modules/normalize.css/normalize.css',
      './node_modules/bootstrap/scss/bootstrap.scss',
      './node_modules/animate.css/animate.css'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, outputBasePath)
  },
  devtool: "source-map",
  resolve: {
     extensions: [".ts", ".tsx", ".js", ".scss"]
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      title: 'Lexi Eikasia',
      filename: 'index.html',
      template: 'index.html'
    })
  ]
};