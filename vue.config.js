const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    before: require('./mock/server.js')
  },
  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    /**
     * webpack-chain 常用配置写法
     * https://juejin.cn/post/6947851867422621733
     */
    // 1、entry 入口配置
    // config.entry('main').add('./src/main.js')
    /** 等同于
    *  entry: {
         main: ['./src/main.js']
       },
    */

    //  2、output 出口配置
    config.output
      .path(path.resolve(__dirname, './dist'))
      // .filename('[name].[chunkhash].js')
      // .chunkFilename('chunks/[name].[chunkhash].js')
      .libraryTarget('umd')
    /** 等同于
     *  output: {
          path: path.resolve(__dirname, './dist'),
          filename: '[name].[chunkhash].js',
          chunkFilename: 'chunks/[name].[chunkhash].js',
          libraryTarget: 'umd'
        },
     */

    // 3、alias 别名配置
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('assets', path.resolve(__dirname, 'src/assets'))
    /** 等同于
     *  resolve: {
          alias: {
            '@': path.resolve(__dirname, 'src'),
            assets: path.resolve(__dirname, 'src/assets')
          }
        },
     */

    // 4、loader 配置新增
    config.module
      .rule('babel')
      .test(/\.(js|jsx|mjs|ts|tsx)$/)
      .include.add(path.resolve(__dirname, 'src'))
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        presets: ['@babel/preset-env']
      })
    /** 等同于
     *  module: {
          rules: [
            {
              test: /\.(js|jsx|mjs|ts|tsx)$/,
              include: [path.resolve(__dirname, 'src')],
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              ]
            }
          ]
        },
     */

    // // 5、loader 配置修改
    // // 跟新增 loader 不同的是，使用了 tap 方法，该方法的回调参数为 options
    // // 即该 loader 的配置选项对象，从而我们可以通过更改 options 对象，从而去更改 loader 配置。
    // config.module
    //   .rule('babel')
    //   .use('babel-loader')
    //   .tap(options => {
    //     // 修改它的选项...
    //     options.include = path.resolve(__dirname, 'icons')
    //     return options
    //   })
    // // 6、loader 配置移除
    // config.module.rules.clear() // 添加的 loader 都删掉.
    // config.module.rule('babel').uses.clear() //删除指定 rule 用 use 添加的

    // // 7、plugin 配置新增
    // config.plugin('HtmlWebpackPlugin').use(HtmlWebpackPlugin, [
    //   {
    //     template: path.resolve(__dirname, './src/index.html'),
    //     minify: {
    //       collapseWhitespace: true,
    //       minifyJS: true,
    //       minifyCSS: true,
    //       removeComments: true,
    //       removeEmptyAttributes: true,
    //       removeRedundantAttributes: true,
    //       useShortDoctype: true
    //     }
    //   }
    // ])

    /**
     *  plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './src/index.html'),
          minify: {
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true
          }
        })
      ],
     */
    // // 8、plugin 配置修改
    // // 跟新增 loader/plugin 不同的是，使用了 tap 方法，且保留了之前配置的选项，更改的选项被覆盖。
    // config
    //   .plugin('HtmlWebpackPlugin')
    //   .tap(args => [
    //     {
    //       ...(args[0] || {}),
    //       template: path.resolve(__dirname, './public/index.html')
    //     }
    //   ])

    // // 9、使用 when 条件进行配置
    // // 1、示例：仅在生产期间添加minify插件
    // config.when(process.env.NODE_ENV === 'production', config => {
    //   config.plugin('minify').use(BabiliWebpackPlugin)
    // })
    // // 2、示例：只有在生产过程中添加缩小插件，否则设置 devtool 到源映射
    // config.when(
    //   process.env.NODE_ENV === 'production',
    //   config => config.plugin('minify').use(BabiliWebpackPlugin),
    //   config => config.devtool('source-map')
    // )

    // 10、插件移除配置
    // config.plugins.delete('HtmlWebpackPlugin')
  }
}
