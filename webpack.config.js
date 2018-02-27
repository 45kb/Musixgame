/*global require,module,__dirname,process*/
const {resolve} = require('path')
  , packageJSON = require('./package.json')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , context = resolve(__dirname, 'src')
  , libConfig = env => ({
    context,
    'entry': {
      'index': './index.js'
    },
    'output': {
      'filename': '[name].js',
      'path': resolve(__dirname, 'dist'),
      'pathinfo': !env.prod,
      'libraryTarget': 'umd'
    },
    'devServer': {
      'historyApiFallback': true
    },
    'devtool': 'source-map',
    'module': {
      'rules': [
        {
          'test': /\.jsx?$/,
          'exclude': /node_modules/,
          'use': {
            'loader': 'babel-loader',
            'options': {
              'presets': [
                'react'
              ]
            }
          }
        },
        {
          'test': /\.(s)?css$/,
          'use': ExtractTextPlugin.extract({
            'use': [
              {
                'loader': 'css-loader',
                'options': {
                  'sourceMap': true
                }
              },
              {
                'loader': 'resolve-url-loader'
              },
              {
                'loader': 'sass-loader',
                'options': {
                  'sourceMap': true
                }
              }
            ],
            'fallback': {
              'loader': 'style-loader'
            }
          })
        },
        {
          'test': /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          'loader': 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          'test': /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          'loader': 'url-loader?limit=10000&mimetype=application/font-sfnt'
        },
        {
          'test': /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          'loader': 'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject'
        },
        {
          'test': /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          'loader': 'url-loader?limit=10000&mimetype=image/svg+xml'
        }
      ]
    },
    'plugins': [
      new ExtractTextPlugin({
        'filename': '[name].css',
        'disable': process.env.NODE_ENV === 'development'
      }),
      new HtmlWebpackPlugin({
        'title': `${packageJSON.name} - ${packageJSON.version}`,
        'template': './musicapp.ejs'
      })
    ]
  });

  module.exports = libConfig;
