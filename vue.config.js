const path = require('path')

module.exports = {
  filenameHashing: false,
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src/'),
        '@': path.resolve(__dirname, 'src/'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@helpers': path.resolve(__dirname, 'src/helpers'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@mixins': path.resolve(__dirname, 'src/mixins')
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "node_modules/bourbon/core/_bourbon.scss";
          @import "@/assets/styles/settings/settings.scss";
        `
      }
    }
  }
}
