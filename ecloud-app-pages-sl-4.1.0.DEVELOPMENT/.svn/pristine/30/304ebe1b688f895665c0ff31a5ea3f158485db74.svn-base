var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')
// var _config = require('./sy-config')
// const chalk = require("chalk");
// const { say } = require("cfonts");
// const error = chalk.bold.red;
// const success = chalk.bold.green;
// const info = chalk.bold.blue;
// const danger = chalk.bold.red;
// const warning = chalk.keyword("orange");
// const log = console.log;
// var text = '',colors = [];
// if(process.env.NODE_ENV == 'production'){
// 	text = "Building production";
// 	colors= ['green', 'yellow', 'blue'];
// }else{
// 	text = "Start development";
// 	colors = ["green", "yellow", "red"];
// }
// say(text, {
//     font: "simple3d", //define the font face
//     align: "left", //define text alignment
//     colors: colors, //define all colors
//     background: "black", //define the background color
//     letterSpacing: 1, //define letter spacing
//     lineHeight: 1, //define the line height
//     space: true, //define if the output text should have empty lines on top and on the bottom
//     maxLength: "100" //define how many character can be on one line
// });

// require('./theme.js')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	externals: {
		jquery: 'window.jQuery',
		axios: 'axios',
		moment: 'moment',
		lodash: '_',
		qs: 'Qs',
		echarts: 'echarts',
		sortablejs: 'Sortable',
		'js-cookie': 'Cookies',
		screenfull: 'screenfull',
		vue: 'Vue',
		vuex: 'Vuex',
		'vue-router': 'VueRouter',
		'vue-i18n': 'VueI18n',
		'element-ui': 'ELEMENT',
		'ecloud-ui': 'ECLOUD'
	},
	entry: {
		app: ['babel-polyfill','./src/main.js']
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', '.css'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
			'src': resolve('src'),
			'static': resolve('static'),
			'api': resolve('src/api'),
			'root': resolve(''),
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('images/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	}
}