<template>
    <div class="newsInfo">
        <h3 class="title">{{newsInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{newsInfo.add_time|dateFormat('YYYY-MM-DD')}}</span>
            <span>点击：{{newsInfo.click}}</span>
        </p>
        <hr>
        <!--内容-->
        <div class="container" v-html="newsInfo.content">

        </div>
        <!--评论-->
        <comment-box :id="this.id"></comment-box>
    </div>

</template>

<script>
    import comment from "../subcomponents/comment.vue";
    import {Toast} from 'mint-ui'
    export default {
        data(){
            return{
                id:this.$route.params.id,
                newsInfo:{}
            }
        },
        created(){
            this.getnewsInfo();
        },
        methods:{
          getnewsInfo(){
              this.$http.get('http://www.liulongbin.top:3005/api/getnew/'+this.id).then(result=>{
                  if(result.body.status===0){
                      this.newsInfo=result.body.message[0];
                  }else{
                      Toast('获取失败');
                  }
              })
          }
        },
        components:{
            'comment-box':comment
        }

    }
</script>

<style  lang="scss" scoped>
    .newsInfo{
        padding: 0 4px;
        .title{
            font-size: 18px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }
        .subtitle{
            font-size: 13px;
            color: #225aff;
            display: flex;
            justify-content: space-between;
        }
        .container{

        }
    }
</style>