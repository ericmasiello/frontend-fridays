module.exports = {
  presets: ['@babel/preset-react'],
  env: {
    cjs: {
      presets: ['@babel/preset-env'],
    },
    esm: {
      presets: ['@babel/preset-modules'],
    },
  },
};
