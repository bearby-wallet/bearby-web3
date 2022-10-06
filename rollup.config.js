import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';


const production = !process.env.ROLLUP_WATCH;


export default {
  input: 'index.ts',
  output: {
    dir: 'dist',
		name: 'web3',
    sourcemap: true,
		format: 'umd',
		exports: 'named',
		sourcemap: true,
		preferConst: true
  },
  plugins: [
    resolve({
			jsnext: true,   
			main: true,
			brower: true,
			preferBuiltins: false
		}),
    typescript({
			sourceMap: true,
			declaration: true,
			inlineSources: true
		}),
    production && terser({
			format: {
				comments: false
			},
			compress: false
		})
  ],
};
