<template>
    <div class="topic-comments">
        <h1>Комментарии</h1>
        <transition name="fade">
            <h2 v-if="commentsData?.length == 0">Еще нет комментариев</h2>
        </transition>
        <div v-if="commentsData?.length > 0" class="comment-list">
            <transition-group name="list">
                <li v-for="comment in commentsData" v-bind:key="comment.id"> 
                    <CommentView class="list-complete-item" @deleteComment="onDeleteComment" :comment="comment"></CommentView>
                </li>
            </transition-group>
        </div>
        <textarea
         v-model="comment.text"
         rows="4"
         type="text"  
         placeholder="Текст комментария">
        </textarea>
        <a class="button" @click="sendComment">Отправить комментарий</a>

    </div>
    
    
</template>

<script>
import CommentView from './CommentView.vue';

import CommentService from "@/services/CommentService"
export default{
    props: ["comments"],
    components: { CommentView },
    data(){
        return{
            comment:{topicId: this.$route.params.id},
            commentsData:[]
        }
    },
    methods:{
        sendComment(){
            CommentService.createComment(this.comment).then(response=>{
                if(response){
                    this.commentsData.push(response.data)
                    this.comment.text = ""
                }
                
            })
        },
        onDeleteComment(comment){
            let index = this.getIndex(this.commentsData, comment.id)
            this.commentsData.splice(index, 1)
        },
        getIndex(list, id) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === id) {
                    return i;
                }
            }
            return -1;
        },
    },
    watch:{
        "comments"(){
            this.commentsData = this.comments
            this.commentsData.map(comm =>{
                comm.topicId = this.$route.params.id
            })
        }
    }
}
</script>

<style scoped>
.topic-comments{
        display: flex;
        flex-direction: column;

        align-items: flex-start;
        justify-content: center;
        margin-top: 20px;
        background-color: black;
        border-radius: 10px;
        padding: 10px;
        margin-block:20px;
        width: 800px;
    }
    
    h1, h2{
        color: #FDF9ED;
        align-self: center;
    }
    p{
        color: #FDF9ED;
        font-size: 20px
    }
  
    .comment-list{
        width: -webkit-fill-available;
        margin-bottom: 20px;
    }
    
    .button{
        align-self: center;
    }

    textarea{
        background-color: #D9D9D9;
        border-radius: 10px;
        width: -webkit-fill-available;
        font-size: 20px;
        margin-inline: 5px;
        margin-block: 10px;
        outline: none;
        border: hidden;
        font-family: 'Krub';
        font-style: normal;
        font-weight: 700; 
        
        resize: vertical;

    }
</style>
