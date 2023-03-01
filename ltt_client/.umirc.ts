export default {
  npmClient: 'yarn',
  proxy: {
    '/LearnTech_api': {
      'target': //'http://127.0.0.1:3000',
        'http://hanbaoaaa.xyz/LearnTech_api/',
      'changeOrigin': true,
      'pathRewrite': { '^/LearnTech_api' : '' },
    },
  },
  base:"/",
      // "/LearnTech/",
  publicPath:
      "/"
      // "/LearnTech/"
};
