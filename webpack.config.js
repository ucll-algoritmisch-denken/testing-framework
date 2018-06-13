const path = require('path');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


module.exports = [
    {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
            library: '',
            libraryTarget: 'commonjs'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        'ts-loader',
                        'tslint-loader'
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                },
                {
                    test: /\.scss$/,
                    use: [ 'style-loader', 'css-loader', 'sass-loader' ]
                },
                {
                    test: /\.png$/,
                    use: {
                        loader: 'file-loader',
                        options: { name: '[name].[ext]' }
                    }
                },
             ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.css', '.scss', '.json'],
            plugins: [ new TsConfigPathsPlugin( {} ) ]
        }
    },
];
