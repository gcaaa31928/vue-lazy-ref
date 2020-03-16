module.exports = {
	testMatch: ['**/tests/**/*.js', '**/tests/**/*.ts'],
	collectCoverageFrom: ['src/**/*.js'],
	moduleFileExtensions: ['js', 'vue'],
	transform: {
		'^.+\\.js$': 'babel-jest'
	},
	moduleNameMapper: {
		'^vue$': 'vue/dist/vue.common.js',
		'^@/(.*)$': '<rootDir>/$1'
	}
};
