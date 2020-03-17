const babel = require('rollup-plugin-babel')
import { terser } from "rollup-plugin-terser";

const banner = `/*
 * @license
 * Copyright 2020-2020, Red Huang
 * Released under the MIT License
 */`

module.exports = {
	input: 'index.js',
	output: [
		{ file: 'dist/vue-lazy-ref.js', format: 'cjs', banner },
		{ file: 'dist/vue-lazy-ref.min.js', format: 'cjs', banner, plugins: [terser()] },
		{ file: 'dist/vue-lazy-ref.es.js', format: 'es', banner }
	],
	plugins: [
		babel({
			runtimeHelpers: true
		})
	]
}
