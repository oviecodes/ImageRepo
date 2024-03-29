module.exports = {
	'env': {
		'commonjs': true,
		'es2021': true,
		'node': true,
		'jest': true,
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 12
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		// 'no-console': 0
	},
}
