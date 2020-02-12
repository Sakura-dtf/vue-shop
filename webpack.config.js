const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const htmlWebpackPlugin=require('html-webpack-plugin');



// 这个配置文件，起始就是一个 JS 文件，通过 Node 中的模块操作，向外暴露了一个 配置对象

//配置文件其实就是JS文件，通过Node中的模块操作，想外暴露了一个 配置对象
module.exports={
    //需要主动指定入口和出口
    entry: path.join(__dirname,'./src/main.js'), //表示使用webpack打包哪个文件
    output: {
        path: path.join(__dirname,'./dist'),//指定打包好的文件，输出到哪个目录中去
        filename: "bundle.js"   //这是指定输出文件的名称
    },
    devServer:{
        //这是配置  dev-server 命令参数的第二种形式
        open:true,  //自动打开浏览器
        port:3000,  //设置启动时的运行端口
        contentBase:'src',//设置主页面
        hot:true,  //设置热更新，异步
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            //创建一个在内存中生存HTML 页面的插件
            template: path.join(__dirname,'./src/index.html'),
            filename: "index.html"  //指定生存的页面名称
        }),
    ],
    module: {    //这个节点用于配置所以第三方模块加载器
        rules: [    //所以第三方模块的匹配规则
            {test: /\.css$/,use:['style-loader','css-loader']},//匹配类型加使用工具
            {test: /\.less$/,use:['style-loader','css-loader','less-loader']},
            {test: /\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test: /\.(jpg|gif|jpeg|png)$/,loader:'url-loader'/*,options: { limit: 10000, name: utils.assetsPath('img/[name].[hash:7].[ext]') }*/},

            {test: /\.(ttf|eot|svg|woff|woff2)$/, use:'url-loader'},
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},   //配置babel
            {test:/\.vue$/, use:'vue-loader'}

        ]
    },
    resolve:{
        alias:{  //设置vue导入时候的路径
            "vue$":"vue/dist/vue.js"
        }
    }

};


//当我们在控制台，直接输入webpack命令执行的时候，webpack做了一下几步
//1.首先webpack发现，我们并没有通过命令的格式，给他指定入口和出口
//2.webpack就会去项目目录中，查找一个叫做'webpack.config.js'的配置文件
//3.当找到配置文件后，为webpack会去执行这个文件，当解析执行完配置文件后，就得到了配置对象
//4.当webpack拿到配置对象后，就拿到了配置对象中的指定的入口和出口，然后进行打包


//运行 npm i webpack-dev-server -D  把这个工具下载安装到项目的本地开发依赖中
//安装之后，这个工具的用法与webpack用法完全一致
//由于在项目中本地安装的webpack-dev-server (基于webpack)所以不发把它当做脚本命令，在终端中直接进行


//  webpack-dev-server 帮我打包生成的bundle.js文件并没有放在磁盘上，
//  而是直接托管到电脑的内存中，所以我们在项目目录中根本找不到bundle.js
//   我们可以认为webpack-dev-server把打包好的文件以一种虚拟的形式托管到我们的项目根目录中。


