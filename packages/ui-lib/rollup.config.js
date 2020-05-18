import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

const babelEnv = process.env.BABEL_ENV;

export default {
  input: 'src/index.js',
  output:
    babelEnv === 'esm'
      ? {
          file: pkg.module,
          format: 'es',
          sourcemap: true,
        }
      : {
          file: pkg.main,
          format: 'cjs',
          sourcemap: true,
        },
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    postcss({
      modules: true,
      extract: true,
      minimize: !process.env.ROLLUP_WATCH,
      plugins: [autoprefixer()],
    }),
    resolve(),
    commonjs(),
    external(),
  ],
};
