const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'index.html',
        }),
        new NodePolyfillPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        static: path.join(__dirname, 'build'),
        compress: true,
        setupMiddlewares: (middlewares, devServer) => {
            devServer.app.use(
                '/api',
                createProxyMiddleware({
                    target: 'http://localhost:3000', // Changed to http
                    changeOrigin: true,
                    secure: false // This is useful if you're not using https in development
                })
            );
            return middlewares;
        },
        port: 8080,
    }
};



