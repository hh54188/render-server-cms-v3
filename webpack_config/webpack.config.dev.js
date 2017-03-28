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
            'components': path.resolve(path.join('.', 'src', 'components'))
        }
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    watch: true
};