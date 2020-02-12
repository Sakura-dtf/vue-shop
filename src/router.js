import VueRouter from 'vue-router'

import HomeContainer from "./com/Tabbar/HomeContainer.vue";
import VipContainer from "./com/Tabbar/VipContainer.vue";
import SearchContainer from "./com/Tabbar/SearchContainer.vue";
import ShopcarContainer from "./com/Tabbar/ShopcarContainer.vue";

import newslist from "./com/news/newslist.vue";
import goodsinfo from "./com/goodslist/goodsinfo.vue";
import newsInfo from "./com/news/newsInfo.vue";
import goodslist from "./com/goodslist/goodslist.vue";
import photolist from "./com/photo/photolist.vue";
import photoinfo from "./com/photo/photoinfo.vue";
import goodsComment from "./com/goodslist/goodsComment.vue";
import goodsDesc from "./com/goodslist/goodsDesc.vue";

var router=new VueRouter({
    routes:[
        {path:'/home',component:HomeContainer},
        {path:'/Vip',component:VipContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/search',component:SearchContainer},
        {path:'/', redirect:'/home'},
        {path:'/home/newslist',component:newslist},
        {path:'/home/newsinfo/:id',component:newsInfo},
        {path:'/home/photolist',component:photolist},
        {path:'/home/photoinfo/:id',component:photoinfo},
        {path:'/home/goodslist',component:goodslist},
        {path:'/home/goodsinfo/:id',component:goodsinfo},
        {path:'/home/goodsdesc/:id',component:goodsDesc,name:"/home/goodsdesc"},
        {path:'/home/goodscomment/:id',component:goodsComment,name:"/home/goodscomment"}],
    linkActiveClass:'mui-active'
});

export default router