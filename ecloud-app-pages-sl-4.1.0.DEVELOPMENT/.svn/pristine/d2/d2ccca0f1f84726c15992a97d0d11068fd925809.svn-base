require('./check-versions')()
const chalk = require("chalk");
const error = chalk.bold.red;
const success = chalk.bold.green;
const info = chalk.bold.blue;
const danger = chalk.bold.red;
const warning = chalk.keyword("orange");
const log = console.log;

process.env.NODE_ENV = 'production'

var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

webpack(webpackConfig, function (err, stats) {
	spinner.stop()
	if (err) throw err
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n\n')

	log(success('  Build complete.\n'))
	log(
		'  Tip: built files are meant to be served over an HTTP server.\n' +
		'  Opening index.html over file:// won\'t work.\n'
	)
})
