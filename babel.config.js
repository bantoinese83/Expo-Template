module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: { "@": "./src" },
          extensions: [".ios.js", ".android.js", ".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      ],
      ["inline-import", { extensions: [".sql"] }],
      // Must run before the Reanimated plugin (which must stay last).
      "babel-plugin-react-compiler",
      "react-native-reanimated/plugin",
    ],
  };
};
