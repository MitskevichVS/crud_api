const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
