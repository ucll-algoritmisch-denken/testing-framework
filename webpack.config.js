const path = require('path');

module.exports = [
    {
        entry: './src/main.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js'
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: { loader: 'ts-loader' },
                    exclude: /node_modules/ 
                } ]
        },
        resolve: { extensions: ['.ts', '.js'] }
    }
];
