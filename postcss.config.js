export default {
  plugins: {
    /**
     * @type {import("postcss-preset-env").pluginOptions}
     */
    "postcss-preset-env": {
      /* use stage 3 features + css nesting rules */
      stage: 4,
      features: {
        "nesting-rules": true,
      },
    },
    "postcss-color-mod-function": {},
  },
};
