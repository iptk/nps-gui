const path = require('path')
const webpack = require('webpack')
const VersionFile = require('webpack-version-file')
const gitRevision = new (require('git-revision-webpack-plugin'))()

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
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        query:{
          presets: ['env', 'stage-0', 'react'],
          plugins: ['transform-decorators-legacy']
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
    }),
    new VersionFile({
      output: './public/version',
      package: './package.json',
      template: './versiontemplate.ejs',
      data:{
        gitbranch: JSON.stringify(gitRevision.branch()).slice(1, -1),
        gitcommit: JSON.stringify(gitRevision.commithash()).substr(1, 7)
      }
    })
  ]
}
