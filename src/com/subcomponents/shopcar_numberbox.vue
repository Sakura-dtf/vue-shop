<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='max' style="height: 25px"><!--使用watch监听max值，不管触发几次，最后一次max一定是一个合法值-->
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChange" ref="numbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../libs/MUI/js/mui'
    export default {
        mounted() {
            //初始化数字选择框
            /*console.log(this.max);*/
            mui('.mui-numbox').numbox();
        },
        methods:{
            //数量改变
            countChange(){
                this.$store.commit('updateGoodsInfo',{id:this.goodsid,count:this.$refs.numbox.value});
            }
        },
        props:["initcount","goodsid"]
    }
</script>

<style scoped lang="scss">

</style>