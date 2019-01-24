// https://webpack.js.org/guides/typescript/
var nodeExternals = require('webpack-node-externals');
var glob = require("glob")
const path = require('path');


module.exports = [{
  entry: './server.ts',
  mode: 'development',
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '')
  }
},
{
  entry: 
    // every ts file in the apps dir
    // TODO: webpack needs to be restarted when adding new files
    glob.sync("apps/*.ts").reduce((p, c)=>{
      p[path.basename(c).split(".")[0]] = "./"+c;
      return p;
    }, {})
  ,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist')
  }
}
];