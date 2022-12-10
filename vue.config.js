const path = require('path')
const resolve = (pathToAlias) => {
  return path.resolve(__dirname, pathToAlias)
}
module.exports = {
  chainWebpack: config => {
    config
      .resolve
        .alias
          .set('@', resolve('src'))
          .set('$img', resolve('src/assets/img'))
          .set('$common', resolve('src/components/common'))
          .set('$routed', resolve('src/components/routed'))
          .set('$modals', resolve('src/components/modals'))
          .set('$admin', resolve('src/components/routed/Admin'))
          .set('$file', resolve('src/components/routed/File'))
          .set('$styles', resolve('src/global/styles'))
          .set('$vars', resolve('src/global/styles/vars.sass'))
    config
      .plugin('html')
      .tap(args => {
          args[0].title = 'Mullet Town'
          return args
      })
  },
  pwa: {
    name: 'Mullet Town',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/global/styles/vars.sass"`,
      },
    },
  },
}