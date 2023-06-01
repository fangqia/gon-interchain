const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      fallback: {
        "stream": require.resolve("stream-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "buffer": require.resolve("buffer/"),
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 8082,
    open: true,
    https: false,
    proxy: {
      "/upImage": {
        target: "http://file.upticknft.com/v2/image/upload/",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/upImage": "/",
        },
      },

      "/upVideo": {
        target: "http://file.upticknft.com/file/upload/video/",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/upVideo": "/",
        },
      },
      '/upJson': {
        target: 'http://file.upticknft.com/file/upload/json/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/upJson': '/'
        }
      },
      '/gonapi': {
        target: 'http://192.168.111.81:3000/api',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/gonapi': '/'
        }
      },

      '/uptick': {
        target: 'https://rpc.origin.uptick.network/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/uptick': '/'
        }
      },
      '/iris': {
        target: 'http://34.80.93.133:26657/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/iris': '/'
        }
      }

    }

  },
})
