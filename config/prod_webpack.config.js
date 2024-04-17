const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    mode: 'production',
    output: {
        filename: 'main.js'
    },
    devServer: {
        static: './dist',
        port: 8080,
        client: {
            logging: 'info',
        }
      },
      devtool: 'inline-source-map',
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin(
            {
                template: './src/index_prod.pug',
                filename: 'index.html',
                title: 'Production'
            }
        ),
        new TerserWebpackPlugin(),
        new CssMinimizerWebpackPlugin(),
        new ESLintPlugin(),
        new StylelintPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()]
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        esModule: true,
                    }
                }, 'css-loader']
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}