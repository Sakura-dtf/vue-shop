<template>
    <div>
        <mt-swipe :auto="4000">
            <!--在组件中使用v-for一定要绑定key-->
            <!--谁使用就传lunbolist-->
            <mt-swipe-item v-for="item in lunboList" :key="item.id">
                <!--<img  v-if="item.url===/www.itcast.cn/subject/webzly/images/1.2.jpg" :src="/www.itcast.cn/subject/webzly/images/1.2.jpg">-->
                <img :src="item.img" :class="{full:isfull}">
            </mt-swipe-item>
            <!--<mt-swipe-item></mt-swipe-item>
            <mt-swipe-item></mt-swipe-item>
            <mt-swipe-item></mt-swipe-item>-->
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props:["lunboList","isfull"]
    }
</script>

<style scoped lang="scss">
    .mint-swipe{
        height: 200px;
        /*.mint-swipe-item:nth-child(1){
             background-color: red;
         }
        .mint-swipe-item:nth-child(2){
            background-color: blue;
        }
        .mint-swipe-item:nth-child(3){
            background-color: black;
        }*/
        .mint-swipe-item{
            text-align: center;
            img{
               /* width: 100%;*/
                height: 100%;
            }
            .full{
                width: 100%;
            }
        }
    }
</style>