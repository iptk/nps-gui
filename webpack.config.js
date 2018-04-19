const path = require('path')
const webpack = require('webpack')

jspath = path.resolve(__dirname, 'src')

module.exports = {
  entry: {
    app: ['babel-polyfill', path.resolve(jspath, 'app.js')]
  },
  output: {
    path: path.resolve(__dirname, 'public', 'bundle'),
    filename: "[name].nps-gui.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true, // default is false
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        query:{
          presets: ['env', 'stage-0', 'react']
        }
      },
      {
          test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
          loader: "file-loader"
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ]
}
