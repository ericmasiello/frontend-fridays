# Learning Build Tools

1. Remove all the build tools I have in place but keep storybook working

- Remove .babelrc (make sure this doesnt break storybook)
- Remove dependencies
- Remove all deps for Jest

2. Implement a monorepo moving the example and front-end-friday-ui into it
3. Add a Demo App that can import our project using `create-react-app`
4. Dev Tooling

- prettier, pretty-quick with husky `yarn -W add -D prettier pretty-quick husky`
  ```
  module.exports = {
    trailingComma: 'es5',
    tabWidth: 2,
    singleQuote: true,
    printWidth: 120,
  };
  ```
- eslint: https://www.npmjs.com/package/eslint-config-react-app
  ```
  module.exports = {
    root: true,
    extends: 'react-app',
  };
  ```
  ```
  "lint:script": "eslint src/ --cache"
  ```
- stylelint: `stylelint stylelint-config-ericmasiello styelint-config-css-modules`
  ```
  "lint:style": "stylelint 'src/**/*.{scss,css}'"
  ```

5. Library Tooling

- Build Javascript bundles
- What should the output be? cjs/esm?
- Build CSS
- package.json
  - Browser List for Babel Env
  - main/module/jsnext:main
  - sideEffects
  - files (for setting dist)

# Cheat Sheet

## Babel

### Handling CSS

```
"build": "yarn build:esm; yarn build:cjs",
"build:esm": "BABEL_ENV=esm babel src --out-dir dist/esm --ignore 'src/**/*.test.js','src/**/*.story.js'",
"postbuild:esm": "cp src/components/*.module.scss dist/esm/components; cp -r src/images dist/esm/",
"build:cjs": "BABEL_ENV=cjs babel src --out-dir dist/cjs --ignore 'src/**/*.test.js','src/**/*.story.js'",
```

- `babel-plugin-transform-require-ignore` + `node-sass` (demo why this isn't a viable solution)
- `babel-plugin-css-modules-transform`

### React Optimizations

- `@babel/plugin-transform-react-display-name`
- `babel-plugin-transform-react-remove-prop-types`

### JS Optimizations

- `@babel/preset-modules`
- `@babel/plugin-transform-runtime`


```
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
```
const sass = require('node-sass');

module.exports = function processSass(data, filename) {
  return sass
    .renderSync({
      data: data,
      file: filename,
      outputStyle: 'compressed',
    })
    .css.toString('utf8');
};

```
