module.exports = {
  "transpileDependencies": [
    "vuetify",
    'vue-echarts',
    'resize-detector'
  ],
  publicPath: process.env.PUBLIC_PATH || (process.env.NODE_ENV === 'production' ? '/Sub-Store/' : '/')
}