'use strict'
const path = require('path');

module.exports = {
    entry: './src/components/main.js',
    context: path.join(__dirname, '..'),
    output: {
        filename: './src/build/bundle.js'
    },
    resolve: {
        alias: {
            'components': path.resolve(path.join('.', 'src', 'components')),
            'src': path.resolve(path.join('.', 'src')),
            'stores': path.resolve(path.join('.', 'src', 'stores'))
        }
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            { 
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                loader: 'url-loader?limit=100000' 
            }
        ]
    },
    watch: true
};