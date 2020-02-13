<template>
    <div>
        <!--轮播图区域-->
        <swiper :lunboList="lunbotulist" :isfull="true"></swiper>

        <!--九宫格改造-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                <!--<img src="../../imags/menu1.png"  width="60" alt=""/>-->
                <img src="../../imags/menu1.png" width="60" alt="">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                <img src="../../imags/menu2.png" width="60" alt=""/>
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                <img src="../../imags/menu3.png" width="60" alt=""/>
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../imags/menu4.png" width="60" alt=""/>
                <div class="mui-media-body">留言回赠</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../imags/menu5.png" width="60" alt=""/>
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../imags/menu6.png" width="60" alt=""/>
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>

    </div>
</template>

<script>
    import swiper from "../subcomponents/swiper.vue";
    import {Toast} from 'mint-ui'
    export default {
            data(){
                return{
                    lunbotulist:[]
                }
            },
            created(){
                this.getLunbotu();
            },
            methods: {
                getLunbotu() {
                    this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result => {
                        if (result.body.status === 0) {
                            this.lunbotulist = result.body.message;
                                console.log(result.body.message);
                            //成功getlunbo
                        } else {
                            //失败
                            Toast('加载轮播图失败');
                        }
                    });
                }
            },
            components:{swiper}
    }
</script>

<style  lang="scss" scoped>
    div{

    }


</style>