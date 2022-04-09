const {
  override,
  fixBabelImports,
  addLessLoader,
  addBabelPlugin,
} = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true, // change importing css to less
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {},
    },
  }),
  addBabelPlugin(["jsx-control-statements"])
);
