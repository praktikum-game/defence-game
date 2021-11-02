const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry:"./src/index.tsx", 
    output:{
        path:path.join(__dirname, '/dist'),
        filename:'bundle.js'
    },
    resolve:{
        extensions:['.ts', '.tsx', '.js']
    },
    module:{
        rules:[
            {
                test: /\.tsx$/,
                exclude:/node_modules/,
                use:{
                    loader:'ts-loader'
                },
            },
            {
                test: /\.css$/,
                use:['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 3000,
        
    },
    plugins:[
        new HtmlWebpackPlugin({template:'./public/index.html'})
    ]
};