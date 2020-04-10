const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const applicationConfig = require('./config/admin.js')
const applicationText = require(`./locales/${applicationConfig.language}.json`)
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src/index.js'),
		vendor: [
			'react',
			'react-dom',
			'react-redux',
			'redux-thunk',
			'react-router-dom',
			'react-dropzone',
			'redux',
			'redux-form',
			'redux-form-material-ui',
			'material-ui',
		],
	},

	performance: {
		hints: true,
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',

	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name]-[chunkhash].js',
		chunkFilename: 'js/[name]-[chunkhash].js',
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					name: 'vendor',
					test: 'vendor',
					enforce: true,
				},
			},
		},
	},

	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src'),
			routes: path.resolve(__dirname, 'src/routes'),
			modules: path.resolve(__dirname, 'src/modules'),
			lib: path.resolve(__dirname, 'src/lib'),
		},
	},

	module: {
		loaders: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
		],

		preLoaders: [
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ test: /\.js$/, loader: 'source-map-loader' },
		],
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: [
							'transform-class-properties',
							[
								'@babel/plugin-transform-modules-commonjs',
								{
									allowTopLevelThis: true,
								},
							],
						],
					},
				},
			},
			{
				test: /\.css$/,
				include: [path.resolve(__dirname, 'public')],
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: false,
							importLoaders: true,
						},
					},
					'postcss-loader',
				],
			},
			{
				test: /\.css$/,
				exclude: /node_modules|public/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: true,
						},
					},
					'postcss-loader',
				],
			},
			{
				test: /\.sass$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								indentWidth: 4,
								includePaths: [path.resolve('node_modules')],
							},
						},
					},
				],
			},
		],
	},

	plugins: [
		new copyWebpackPlugin([
			{
				from: 'public',
				to: 'assets',
			},
		]),
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			APPLICATION_CONFIG: JSON.stringify(applicationConfig),
		}),
		new webpack.DefinePlugin({
			APPLICATION_TEXT: JSON.stringify(applicationText),
		}),
		new MiniCssExtractPlugin({
			filename: 'css/bundle-[contenthash].css',
			chunkFilename: 'css/bundle-[contenthash].css',
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			language: applicationConfig.language,
			inject: 'body',
			filename: 'index.html',
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			language: applicationConfig.language,
			inject: 'body',
			filename: '404.html',
		}),
		new webpack.BannerPlugin({
			banner: `Created: ${new Date().toUTCString()}`,
			raw: false,
			entryOnly: false,
		}),
	],

	stats: {
		children: false,
		entrypoints: false,
		modules: false,
	},
}
