<template>
    <div class="photeinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
        <span>发表时间:{{photoinfo.add_time|dateFormat}}</span>
        <span>点击次数：{{photoinfo.click}}次</span>
        </p>
        <div class="thumbs">
            <vue-preview :slides="list" @close="handleClose"></vue-preview>
        </div>
        <div class="content" v-html="photoinfo.content">

        </div>

        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
    import comment from "../subcomponents/comment.vue";
    export default {
        data(){
            return{
                id:this.$route.params.id,
                photoinfo:{},
                list:[],
            }
        },
        created(){
            this.getphotoinfo();
            this.getThumbs();



        },
        methods:{
            getThumbs(){
                //获取缩略图
                this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id).then(result=>{
                    if(result.body.status===0){
                        //增加宽高
                        result.body.message.forEach(item=>{
                            item.msrc=item.src;
                            item.w=600;
                            item.h=400;
                        });
                        this.list=result.body.message;
                    }else {

                    }
                })
            },
            getphotoinfo(){
                this.$http.get('http://www.liulongbin.top:3005/api/getimageInfo/'+this.id).then(result=>{
                    if(result.body.status===0){
                        this.photoinfo=result.body.message[0];
                    }
                });
            },
            handleClose () {
                console.log('close event')
            }
        },
        components:{'cmt-box':comment}
    }
</script>

<style lang="scss" >
    .photeinfo-container{
        padding: 3px;
        h3{
            color: #26A2FF;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            display:flex;
            justify-content:space-between ;
            font-size: 13px;
        }
        .content{
            font-size: 13px;
            line-height: 25px;
        }
        .thumbs{
            .my-gallery{
                display: flex;
                flex-wrap: wrap;
                figure{
                    width: 30%;
                    margin: 5px;
                    img{
                        width: 100%;
                        box-shadow: 0 0 8px #ccc;
                        border-radius: 5px;
                    }
                }
            }
        }
    }

</style>