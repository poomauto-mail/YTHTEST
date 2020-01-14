module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: "/",
  devServer: {
    proxy: "http://localhost:5000"
  }
};
