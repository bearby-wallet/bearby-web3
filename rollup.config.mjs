import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';


const production = !process.env.ROLLUP_WATCH;


export default {
  input: 'index.ts',
  output: {
    dir: 'dist',
		name: 'web3',
		sourcemap: true,
		format: 'umd',
		sourcemap: true
  },
  plugins: [
    resolve({
			brower: true
		}),
    typescript({
			sourceMap: true,
			declaration: true,
			inlineSources: true
		}),
    commonjs(),
    production && terser({
			format: {
				comments: false
			},
			compress: false
		})
  ],
};