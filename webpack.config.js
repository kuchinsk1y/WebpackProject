const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // автоматичне очищення dist перед кожною збіркою
  },
  module: {
    rules: [
      // Обработка CSS
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      // Обработка SCSS
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // Обработка LESS
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      // Обработка TypeScript
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // Обработка изображений
      {
        test: /\.(jpe?g|gif|png|ico|svg)$/i,
        type: 'asset/resource',  // Обрабатываем изображения как ресурсы
        generator: {
          filename: 'images/[name].[hash][ext][query]',
        },
      },
    ],
  },
  
  resolve: {
    extensions: ['.ts', '.js'], // підтримка .ts файлів
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new BundleAnalyzerPlugin(), // для аналізу розміру бандлів
  ],
  devServer: {
    static: './dist',
    open: true,
    hot: true,
    port: 8080,
    host: 'localhost',
    watchFiles: ['./src/**/*'],
    client: {
      webSocketURL: 'ws://localhost:8080/ws',
    },
  },
  
  optimization: {
    splitChunks: {
      chunks: 'all', // оптимізація бібліотек
    },
  },
};
