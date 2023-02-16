const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    transportMode: "ws",
    contentBase: "./app",
  },
  devtool: "inline-source-map",
});
