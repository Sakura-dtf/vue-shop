<template>


    <!--在网页中有两种跳转方式
    1.使用a标签 href
    2.使用 windo.location.href (先引入router router.push(-'地址'-+参数)的形式  叫做编程时导航
    一定要分清楚this.$route是参数对象所有的路由的参数都属于他
    this.router是一个路由导航对象，可以使用JS控制路由的前进，后退-->
    <div class="goods-list">
        <router-link  class="goods-item" v-for="item in list" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
            <img :src='item.img_url'>
            <h1 class="title">{{item.title}} </h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>

            </div>
        </router-link>
        <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                pageindex:1,  //分页数
                list:[]
            }
        },
        created(){
            this.getgoodslist();
        },
        methods:{
            getmore(){
                this.pageindex++;
                this.getgoodslist();
            },
            getgoodslist(){
                this.$http.get('http://www.liulongbin.top:3005/api/getgoods?pageindex='+this.pageindex).then(result=>{
                    if(result.body.status===0){
                        /*this.list=result.body.message;*/
                        this.list=this.list.concat(result.body.message)
                    }else{

                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;  //换行
        padding: 7px;
        justify-content:space-between ;
        .goods-item{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 290px;
            padding: 2px;
            width: 48%;
            border:1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin:5px 0;
            img{
                width: 100%;
            }
            .title{
                font-size: 16px;
            }
            .info{
                background-color: #ccc;
                p{
                    margin:0;
                    padding: 5px;
                }
                .price{
                    .now{
                        color: red;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        padding-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>