<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入评论的内容（最多吐槽120字）" maxlength="120" v-model="message"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list" v-for="(item,i) in comments" :key="item.add_time">
            <div class="cmt-item">
                <div class="title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发起时间：{{item.add_time|dateFormat}}
                </div>
                <div class="body">
                    {{item.content==='undefined'? '此用户很懒，嘛都没说':item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        data(){
            return{
                pageIndex:1,
                comments:[],
                message:''
            }
        },
        created(){
          this.getcomments();
        },
        methods:{
            postComment(){
                if(this.message.trim().length===0){
                    return Toast('评论内容为空')
                }
                this.$http.post('http://www.liulongbin.top:3005/api/postcomment'+this.id,{content:this.message.trim()}).then(function (result) {
                    console.log(result.body.status);
                    if(result.body.status===0){
                        //拼接数组
                        var cmt={uer_name:'匿名用户',add_time:Date.now(),content:this.message.trim()}
                        this.comments.unshift(cmt);
                        this.message=''
                    }else{
                        Toast('发送失败');
                    }
                })
            },
            getmore(){
                this.pageIndex++;
                this.getcomments();
            },
            getcomments(){
                this.$http.get("http://www.liulongbin.top:3005/api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
                    if(result.body.status===0){
                        //拼接数据，而不是覆盖
                        this.comments=this.comments.concat(result.body.message);
                    }else {
                        Toast('获取失败');
                    }
                })
            }
        },
        props:["id"]
    }
</script>

<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin:5px 0;
            .cmt-item{
                font-size: 13px;
                .title{
                    background-color: #acacb4;
                    line-height: 30px;
                }
                .body{
                    line-height: 40px;
                    text-indent: 2em
                ;
                }
            }
        }
    }

</style>