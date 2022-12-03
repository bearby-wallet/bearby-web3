import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import dts from "rollup-plugin-dts";


const production = !process.env.ROLLUP_WATCH;


export default [
	{
		input: "./types/index.d.ts",
		output: {
			file: "dist/types/index.d.ts",
			format: "es"
		},
		external: ['config/rpc-methods'],
		plugins: [
			dts()
		]
	},
	{
		input: 'index.ts',
		output: {
			dir: 'dist',
			name: 'web3',
			format: 'es',
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
		]
	}
];
