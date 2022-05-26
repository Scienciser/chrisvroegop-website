const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          // This plugin is the best strategy I found to inline SVGs without using data URLs etc.
          {
            loader: "react-svg-loader",
            options: {
              svgo: {
                plugins: [
                  { cleanupIDs: false }, // Prevent SVGO stripping IDs from SVG
                  { convertShapeToPath: false } // Prevent rects being turned into paths, breaking CSS animations
                ],
              },
              jsx: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.webm$/,
        use: [
            {
                loader: "file-loader", // You can probably do this with asset/resource, but I don't know how.
                options: {
                    name: "[name].[ext]",
                }
            }
        ]
    }
        ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
    assetModuleFilename: '[name][ext]'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    })
  ],

};

// Outputs to dist/main.js by default
