// File paths
const basePath = './app';
const entryTsxPath = basePath + '/app.tsx';
const entryScssPath = basePath + '/styles/app.scss';
const outputBasePath = './dist';
const outputFileName = 'js/bundle.js';

const webpack = require('webpack');
const path = require('path');

// Plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    main: entryTsxPath,
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
          use: [
            // Using source maps breaks urls in the CSS loader
            // https://github.com/webpack/css-loader/issues/232
            // This comment solves it, but breaks testing from a local network
            // https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
            // 'css-loader?sourceMap',
            'css-loader?importLoaders=1&modules&localIdentName=[name]__[local]',
            'postcss-loader',
            'sass-loader',
          ],
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
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          Autoprefixer(),
        ]
      }
    })
  ]
};