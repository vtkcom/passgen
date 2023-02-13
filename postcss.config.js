export default {
  plugins: {
    /**
     * @type {import("postcss-preset-env").pluginOptions}
     */
    "postcss-preset-env": {
      features: {
        "nesting-rules": true,
      },
    },
    // "postcss-color-mod-function": {},
  },
};
