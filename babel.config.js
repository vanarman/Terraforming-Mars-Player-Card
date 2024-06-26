module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          "root": ["./src"],
          "alias": {
            "@components": "./src/components",
            "@models": "./src/models",
            "@screens": "./src/screens",
            "@styles": "./src/assets/styles",
            "@images": "./src/assets/img"
          }
        }
      ]
    ]
  };
};
