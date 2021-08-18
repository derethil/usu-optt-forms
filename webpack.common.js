const path = require("path");

module.exports = {
  entry: "./app/webpack/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "app/static/js"),
    publicPath: "/static/",
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
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: "/static/img/",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
};
