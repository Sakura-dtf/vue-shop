<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active':'']" v-for="item in cates":key="item.id" data-wid="tab-top-subpage-1.html" @click="getphotolist(item.id)">
                    {{item.title}}
                    </a>
                </div>
            </div>
        </div>
        <!--图片列表区域-->
        <ul class="photo-list">
            <router-link :to="'/home/photoinfo/'+item.id " v-for="item in list" :key="item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>

</template>

<script>
    import mui from '../../libs/MUI/js/mui.js'

    //解决不能滑动问题
    import {Toast} from 'mint-ui'
    export default {
        data(){
            return{
                cates:[],
                list:[]
            }
        },
        mounted() {

            // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数

            // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的

            // 2. 初始化滑动控件

            mui(".mui-scroll-wrapper").scroll({

                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006

            });

        },
        created(){
            this.getphoto();
            this.getphotolist(0);
        },
        methods:{
            getphoto(){
                this.$http.get('http://www.liulongbin.top:3005/api/getimgcategory').then(result=>{
                    if(result.body.status===0){
                        //手动拼接出最完整的数组
                        result.body.message.unshift({title:'全部',id:0})
                        this.cates=result.body.message;
                    }else {
                    }
                })
            },
            getphotolist(id){
                this.$http.get('http://www.liulongbin.top:3005/api/getimages/'+id).then(result=>{
                    if(result.body.status===0){
                        //手动拼接出最完整的数组
                        this.list=result.body.message;
                    }else {

                    }
                })
            }

        }

    }
</script>

<style lang="scss" scoped>
    * {
        touch-action: pan-y;
    }

    .photo-list{
        padding: 10px;
        margin: 0;
        padding-bottom: 0;
        li{
            padding: 10px;
            margin-bottom: 10px;
            list-style: none;
            text-align: center;
            background-color: #ccc;
            box-shadow: 0 0 6px #999;
            img{
                width: 100%;
                height: 100%;
                vertical-align:middle;
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            position: relative;
            .info{
                /*max-height:84px;*/
                background-color: rgba(0,0,0,0.4);
                position: absolute;
                bottom: 8px;
                color: white;
                text-align: left;
                .info-title{
                    font-size: 14px;

                }
                .info-body{
                    font-size: 13px;
                }
            }

        }
    }

</style>