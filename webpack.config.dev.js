module.exports = {
    entry: './src/components/main.js',
    output: {
        filename: './src/build/bundle.js' // 可以忽略路径只保留文件名而添加path字段
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader' // webpack 提示必须要带 -loader 后缀
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        contentBase: './src',
        hot: true
    }
};