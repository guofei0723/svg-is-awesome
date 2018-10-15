const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const rootPath = path.resolve(__dirname, '../');

// 生成文章代码的入口路径
function articleEntry(p) {
  return './src/article-codes/' + p
}

// 生成html插件
function getHtmlPlugin(title, filename, chunks, initScale=1) {
  return new HtmlWebpackPlugin({
    title: title,
    filename: filename,
    chunks: chunks,
    initScale,
    template: 'templates/page.html'
  })
}

module.exports = {
  entry: {
    jsanim: articleEntry('js-anim/index.js'),
    svg: articleEntry('svg/index.js')
  },
  output: {
    filename: '[name]-[hash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
      cacheGroups: {
        myModule: {
          test: /src\/commons\//,
          name: 'commons'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              'transform-class-properties',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {root: rootPath}),
    getHtmlPlugin('JS Animation', 'jsanim.html', ['jsanim']),
    getHtmlPlugin('SVG is Awesome', 'svg.html', ['svg'], 0.5),
  ]
}