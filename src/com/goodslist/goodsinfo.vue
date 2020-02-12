<template>
    <div  class="goodsinfo-container">
        <!--轮播图-->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">

            <div class="ball" v-show="ballfull" ref="ball"></div>
        </transition>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunboList="goodsinfo" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsmessage.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsmessage.market_price}}</del>
                        &nbsp&nbsp
                        <span class="new">
                            销售价：￥{{goodsmessage.sell_price}}
                        </span>
                    </p>
                    <p>购买数量：
                    <numberbox @getcount="getSelectedCount" :max="goodsmessage.stock_quantity"></numberbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!--商品详情区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-header">商品参数</div>
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsmessage.goods_no}}</p>
                    <p>库存情况：{{goodsmessage.stock_quantity}}件</p>
                    <p>上架时间：{{goodsmessage.add_time|dateFormat}}</p>
                </div>
                <div class="mui-card-footer">
                    <mt-button type="primary" size="large" @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" @click="goComment(id)">商品评论</mt-button>
                </div>
            </div>
        </div>

    </div>
</template>
    <!--为什么轮播图那么丑
    1.首页轮播图的宽高100%没有问题
    2.但这里的轮播图一个高度100% 宽带自适应
    既然这两个轮播图其他方面没有冲突的，只是宽度有问题
    那么可以定义一个属性，可以让轮播图使用者手动修改是否宽度为100%-->
<script>
    import swiper from "../subcomponents/swiper.vue";
    import numberbox from "../subcomponents/goodslist_numberbox.vue";
    import mui from '../../libs/MUI/js/mui'
    export default {
        data(){
            return{
                id:this.$route.params.id,
                goodsinfo:[],
                goodsmessage:{},
                ballfull:false,
                selectCount: 1  //选中商品的数量
            }
        },
        created(){
          this.getgoodsinfo();
          this.getgoodsmessage();
        },
        mounted(){
            //初始化数字选择框
          mui('.mui-number').numbox();
        },
        methods:{
            addToShopCar(){

              this.ballfull=!this.ballfull;
              //拿到商品数量  父子组件嵌套，所以无法直接获取到值
              //子向父传值  父向子传递方法，子调用方法传递参数
                var goodsmessage={ id:this.id,count:this.selectCount,price:this.goodsmessage.sell_price,selected:true};
                this.$store.commit('addToCar',goodsmessage);
                //拼接出要保存在store中的对象

            },
            getgoodsmessage(){
                this.$http.get("http://www.liulongbin.top:3005/api/goods/getinfo/"+this.id).then(result=>{
                    if(result.body.status===0){
                        this.goodsmessage=result.body.message[0];
                    }
                })
            },
            getgoodsinfo(){
                this.$http.get("http://www.liulongbin.top:3005/api/getthumimages/"+this.id).then(result=>{
                    if(result.body.status===0){
                        this.goodsinfo=result.body.message;
                        result.body.message.forEach(item=>{
                            item.img=item.src
                        });
                        this.goodsinfo=result.body.message;
                    }
                })
            },
            goDesc(id){
                //点击使用编程式导航，调整图文介绍
                this.$router.push({name:"/home/goodsdesc",params:{id}})

            },
            goComment(id){
                this.$router.push({name:"/home/goodscomment",params:{id}})

            },
            beforeEnter(el){
                el.style.transform = "translate(0,0)"
            },
            enter(el,done){
                //小球动画优化思路
                //1.本质原因，最终位置已经固定在某一个位置
                //2.只要分辨率和测试的不一样，或者滚动条有一定的距离之后，问题就出现了
                //3.因此，不能写死最终位置的坐标，而要经过计算得处这个计算值
                //4.先得到 徽标的横纵坐标，再得到小球的横纵坐标，让x,y值求差，得到的结果就是最终要移动的距离
                //5.关键是得到徽标和小球的坐标 domObject.getBoundingClientRect()
                const ballPosition=this.$refs.ball.getBoundingClientRect();
                const badgePosition=document.getElementById('badge').getBoundingClientRect();
                //相减得到位移距离
                const xDist=badgePosition.left-ballPosition.left;
                const yDist=badgePosition.top-ballPosition.top;
                el.offsetWidth;
                el.style.transform = `translate(${xDist}px, ${yDist}px)`;id="badge"
                el.style.transition="all 1s cubic-bezier(.4,-0.3,1,.68) ";
                done();
            },
            afterEnter(el){
                this.ballfull=!this.ballfull;
            },
            getSelectedCount(count){
                this.selectCount=count;
            }
        },
        components:{swiper,numberbox}
    }
</script>

<style lang="scss" scoped>
    .goodsinfo-container{
        background-color: #eee;
        overflow: hidden;
    }
    .img{
        height: 100%;
    }
    .new{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display:block;
        button{
            margin: 15px 0;
        }

    }
    .ball{
         width: 15px;
         height: 15px;
         border-radius: 50%;
         background-color: red;
         position: absolute;
         z-index: 99;
         top:390px;
         left: 150px;
     }
</style>