// require('babel-register');

const env = process.env;
const NODE_ENV = process.env.NODE_ENV;
const isDev  = NODE_ENV === 'development';
const isTest = NODE_ENV === 'test';

const webpack = require('webpack');
const fs      = require('fs');
const path    = require('path'),
      join    = path.join,
      resolve = path.resolve;

const root  = resolve(__dirname);
const src   = join(root, 'src');
const examples = join(root, 'examples');
const modules = join(root, 'node_modules');
const dest  = join(root, 'dist');

const getConfig = require('hjs-webpack')

var config = getConfig({
  isDev,
  in: join(examples, 'basic.js'),
  out: dest,
  clearBeforeBuild: true
});

const dotenv      = require('dotenv');
const envVariables = dotenv.config();

// Converts keys to be surrounded with __
const defines =
  Object.keys(envVariables)
  .reduce((memo, key) => {
    const val = JSON.stringify(envVariables[key]);
    memo[`__${key.toUpperCase()}__`] = val;
    return memo;
  }, {
    __NODE_ENV__: JSON.stringify(env.NODE_ENV)
  })


config.externals = {
  'window.google': true
}

config.plugins = [
  new webpack.DefinePlugin(defines)
].concat(config.plugins);

config.output = Object.assign({}, config.output, {
  publicPath: isDev ? 'http://localhost:3000/' : '/'
})

module.exports = config;
