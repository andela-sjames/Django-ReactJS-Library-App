module.exports = {
  entry: [
    './js/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(svg|png|jpg)$/, loader: "url-loader?mimetype=image/jpg"}
    ]
  },
}
