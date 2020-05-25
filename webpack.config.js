const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src/'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@src': path.resolve(__dirname, 'src/'),
            '@pages': path.resolve(__dirname, 'src/pages')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'structure.org',
            template: './public/index.html',
            'meta': {
                'og:title': 'structure.org',
                'charset': 'utf-8',
                'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no',
                'X-UA-Compatible': {'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge'}
            }
        })
    ]
};