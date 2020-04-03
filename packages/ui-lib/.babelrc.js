module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    [
      'transform-react-remove-prop-types',
      {
        mode: 'unsafe-wrap',
      },
    ],
  ],
  env: {
    esm: {
      presets: ['@babel/preset-modules'],
    },
    cjs: {
      presets: ['@babel/preset-env'],
      plugins: [
        [
          'css-modules-transform',
          {
            preprocessCss: './build-scripts/sass.js',
            extensions: ['.css', '.scss'],
            camelCase: true,
            extractCss: './dist/main.css',
          },
        ],
      ],
    },
  },
};
