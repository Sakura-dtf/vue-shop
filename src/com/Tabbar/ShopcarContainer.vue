<template>
    <div class="container">
        <div class="goods-list">
            <!--商品区-->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch  v-model="$store.getters.getGoodsSelected[item.id] "
                                   @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
                <!--结算区域-->
            </div>
            <div class="mui-card">
                <div class="mui-card-content jiesuan" >
                    <div class="mui-card-content-inner ">
                        <div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品<span class="red">{{$store.getters.getAllPriceAndCount.count}}</span>件，总价￥<span class="red">{{$store.getters.getAllPriceAndCount.price}}</span></p>
                        </div>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>


    import numbox from "../subcomponents/shopcar_numberbox.vue";
    export default {
        data(){
            return{
                goodslist:[]
            }
        },
        created(){
            this.getGoodList();
        },
        methods:{
            selectedChanged(id,val){
                this.$store.commit('updateGoodsSelected',{id,selected:val});
            },
            remove(id,index){
              //点击删除，把商品从store中的数据根据id删除，把goodslist中的数据按照index删除
                this.goodslist.splice(index,1);
                this.$store.commit('removeFormCar',id);
            },
            //获取到购物车中使用的物品得到id拼接成字符串
            getGoodList(){
                var idArr=[];
                this.$store.state.car.forEach(item=>{
                   idArr.push(item.id);
                });
                if(idArr.length<=0){
                    return;
                }
                this.$http.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/'+idArr.join(",")).then(result=>{
                    if(result.body.status===0){
                        this.goodslist=result.body.message;

                    }
                });
            }
        },
        components:{numbox}
    }
</script>

<style scoped lang="scss">
    .container{
        background-color: #eee;
        overflow: hidden;
        .goods-list{
            .mui-card-content-inner{
                display: flex;
                justify-content:space-between ;
            }
            img{
                width: 60px;
                height: 60px;
            }
            h1{
                font-size: 13px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price{
                    color: red;
                    font-weight: bold;
                }
            }
            .jiesuan{
                margin: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .red{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
            }
        }
    }
</style>