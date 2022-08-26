export default {
  npmClient: 'yarn',
  proxy: {
    '/LearnTech_api': {
      'target':'http://hanbaoaaa.xyz/LearnTech_api/',
      'changeOrigin': true,
      'pathRewrite': { '^/LearnTech_api' : '' },
    },
  },
  base:"/LearnTech/",
  publicPath:"/LearnTech/"
};
