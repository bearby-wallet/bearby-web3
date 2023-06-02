import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

const production = !process.env.ROLLUP_WATCH;

export default [
	{
		input: 'index.ts',
		output: {
			dir: 'dist',
			name: 'web3',
			format: production ? 'es' : 'umd',
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
			commonjs()
		]
	}
];
