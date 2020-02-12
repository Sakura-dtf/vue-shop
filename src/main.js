//入口文件


import Vue from 'vue'


import Mint from 'mint-ui'
import mui from './libs/MUI/js/mui.js'

import 'mint-ui/lib/style.css'
Vue.use(Mint);

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);

import Vuex from 'vuex'
Vue.use(Vuex);






/*import {Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name,Button);
Vue.use(Lazyload);*/

import 'mint-ui/lib/style.css'


import './libs/MUI/css/mui.css'
import './libs/MUI/css/icons-extra.css'



import VueRouter from "vue-router"
Vue.use(VueRouter);

import app from './app.vue'

import moment from 'moment'

import router from "./router";

import VueResource from 'vue-resource'


Vue.use(VueResource);
var car=JSON.parse(localStorage.getItem('car')||'[]');


//全局设置post请求三个参数的形式
Vue.http.options.emulateJSON=true;
//定义全局过滤器
Vue.filter('dateFormat',function (datastr,patten="YYYY-MM-DD HH:mm:ss") {
    return moment(datastr).format(patten)
    
});

const store=new Vuex.Store({
    state:{
        //相当于data  用于存储数据  想要访问  通过 this.$store.state.***
        car:car    //购物车的商品数据，用一个数组存起来，商品对象数组{id:,count:,price:，selected:是否被选中}
    },
    mutations:{
        updateGoodsSelected(state,info){
            state.car.forEach(item=>{
                if(item.id==info.id){
                    item.selected=info.selected;
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car));

        },
        removeFormCar(state,id){
          //根据id删除商品
            state.car.some((item,i)=>{
                if(item.id==id){
                    state.car.splice(i,1);
                }
            });
            localStorage.setItem('car',JSON.stringify(state.car));

        },
        updateGoodsInfo(state,goodsList){
            state.car.some(item=>{
                if(item.id==goodsList.id){
                    item.count=parseInt(goodsList.count);
                    localStorage.setItem('car',JSON.stringify(state.car));
                    return true
                }
            });
        },
        //相当于组件中的methods，通过调用  this.$store.commit('方法名'，（参数唯一，或者无）)
        addToCar(state,goodsmessage){
            //点击加载购物车，将数据保存在store
            //如果购物车之前已经有这个对应的商品了那么只需要更新数量
            //如果没有则直接把商品数据push到car中
            var flag=false;
            state.car.some(item=>{
                if(item.id==goodsmessage.id){
                    item.count+=parseInt(goodsmessage.count);
                    flag=true;
                    return true
                }
            });
            if(!flag){
                state.car.push(goodsmessage);
            }
            //当更新car的数据之后，吧数据存储在本地的 localstorage中
            localStorage.setItem('car',JSON.stringify(state.car));
        }
    },
    getters:{
        //getters 只负责向外提供数据 不负责修改数据
        //相当于计算属性，也相当于过滤器
        getAllCount(state){
            var c=0;
            state.car.forEach(item=>{
                c+=item.count;
            });
            return c;
        },

        getGoodsCount(state){
            var o={};
            state.car.forEach(item=>{
                o[item.id]=item.count;
            });
            return o;
        },
        getGoodsSelected(state){
            var o={};
            state.car.forEach(item=>{
                o[item.id]=item.selected;
            });
            return o;
        },
        getAllPriceAndCount(state){
            var o={
                count:0,
                price:0
            };
            state.car.forEach(item=>{
                if(item.selected==true){

                    o.count+=item.count;
                    o.price+=item.price*item.count;
                }
            });
            return o;
        }
    }
});

var vm =new Vue({
    el:'#app',
    render:c=>c(app),
    router,
    store
});


