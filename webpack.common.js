const path = require('path');

module.exports = {
  entry: './app/webpack/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'app/static/js'),
    publicPath: "/static/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          // [style-loader](/loaders/style-loader)
          { loader: 'style-loader' },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // [sass-loader](/loaders/sass-loader)
          // { loader: 'sass-loader' }
        ]
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  }
}