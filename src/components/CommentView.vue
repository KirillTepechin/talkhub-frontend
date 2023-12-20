<template class="list-complete-item">
    <PopUpDialog
      v-show="isShowModalDelete"
      text='Вы действительно хотите удалить комментарий?'
      @modalAction="onModalActionDelete"
    />
    <PopUpDialog
      v-show="isShowModalComplaint"
      text='Вы действительно хотите подать жалобу на этот комментарий?'
      @modalAction="onModalActionComplaint"
    />
    <div class="block" >
    <span v-for="index in level" :key="index" class="dot"></span>
    <div class="comment" > 
        <div class="comment-info" :id="commentReplication.id">
            <div class="comment-header">
                <UserView :user="commentReplication.user"></UserView>
                <span>{{ commentReplication.date }}</span>
            </div>
            <div class="comment-content">
                <p>{{ commentReplication.text }}</p>
                <div style="display: flex;">
                    
                    
                    <div v-if="!isComplaint && (commentReplication.user?.login == getCurrentUser())" class="btn-group">
                        <a class="text-btn" id="change" @click="showOrHideEdit(commentReplication)">{{ stateChange }}</a>
                        <a class="text-btn" @click="toggleModalDelete">Удалить</a>
                    </div>

                    <div v-if="!isComplaint" class="btn-group">
                        <a class="text-btn" id="reply" @click="showOrHideReply()">{{ stateReply }}</a>
                        <a class="text-btn" @click="toggleModalCompaint()">Пожаловаться</a>
                    </div>
                </div>
                
            </div>

        </div>
        <div v-show="showForm" v-if="!isComplaint" class="comment-form">
            <textarea
                v-model="newComment.text"
                rows="4"
                type="text"  
                placeholder="Текст комментария">
            </textarea>
            <a class="button" @click="sendComment" id="small">Отправить комментарий</a>

        </div>
        <div class="sub-comments" :style="{ 'margin-left': level * -30 + 'px' }">
            <transition-group name="list">
                <li v-for="nestedComment in commentComments" v-bind:key="nestedComment.id"> 
                    <CommentView v-if="!isComplaint" :level="level + 1" :comment="nestedComment" @deleteComment="onDeleteComment"></CommentView>
                </li>
            </transition-group>
        </div>
        
    </div>
    </div>
    
</template>

<script>
    import UserView from './UserView.vue';
    import CommentView from './CommentView.vue';
    import CommentService from "@/services/CommentService"
    import ComplaintService from '@/services/ComplaintService';
    import PopUpDialog from "@/pop-up/PopUpDialog.vue"

    export default{
        props: {
            comment: Object,
            level: {
                type: Number,
                default: 0
            },
            isComplaint: {
                type: Boolean,
                default: false
            }
        },
        components: { UserView, CommentView, PopUpDialog },
        data(){
            return{
                showForm: false,
                isShowModalDelete: false,
                isShowModalComplaint: false,
                newComment:{
                    text: this.comment.user.login+', ',
                    topicId: this.comment.topicId,
                    parentCommentId: this.comment.id
                },
                commentReplication: Object,
                commentComments:[],
                stateReply: 'Ответить',
                stateChange : 'Изменить'
            }
        },
        methods:{
            complaint(){
                let complaint = {complaintType: "ON_COMMENT", id: this.commentReplication.id}
                ComplaintService.createComplaint(complaint).then(response=>{
                    if(response){
                        alert("Жалоба подана на рассмотрение")
                    }
                })
            },
            showOrHideReply(){
                this.showForm=!this.showForm;
                if(this.showForm){
                    this.stateReply = 'Скрыть'
                }
                else{
                    this.stateReply = 'Ответить'
                }
            },
            showOrHideEdit(comment){
                this.showForm=!this.showForm;
                if(this.showForm){
                    this.stateChange = 'Скрыть'
                    this.newComment.id = comment.id
                    this.newComment.text = comment.text
                }
                else{
                    this.stateChange = 'Изменить'
                    this.newComment = {
                            text: this.comment.user.login + ', ',
                            topicId: this.comment.topicId,
                            parentCommentId: this.comment.id
                    }
                } 
                
            },
            sendComment(){
                if(this.newComment.id){
                    CommentService.editTopic(this.newComment).then((response)=>{
                        this.commentReplication = response.data
                        this.newComment = {
                            text: this.comment.user.login + ', ',
                            topicId: this.comment.topicId,
                            parentCommentId: this.comment.id
                        }
                    })
                    this.stateChange = 'Изменить'

                }
                else {
                    CommentService.createComment(this.newComment).then(response => {
                        if(response){
                            this.commentComments.push(response.data)
                            this.newComment = {
                                text: this.comment.user.login + ', ',
                                topicId: this.comment.topicId,
                                parentCommentId: this.comment.id
                            }
                        }
                    })
                    this.stateReply = 'Ответить'

                }
                
                this.showForm=!this.showForm;
            },
            getCurrentUser(){
                return JSON.parse(localStorage.getItem('user'))?.login
            },
            toggleModalDelete() {
                this.isShowModalDelete = !this.isShowModalDelete;
            },
            toggleModalCompaint() {
                this.isShowModalComplaint = !this.isShowModalComplaint;
            },
            onModalActionDelete(flag){
                if(!flag){
                    this.isShowModalDelete = false
                }
                else{
                    CommentService.deleteComment(this.commentReplication.id).then(
                        this.$emit('deleteComment', this.commentReplication)
                    )
                    this.isShowModalDelete = false
                }
            },
            onModalActionComplaint(flag) {
                if (!flag) {
                    this.isShowModalComplaint = false
                }
                else {
                    this.complaint()
                    this.isShowModalComplaint = false
                }
            },
            onDeleteComment(comment){
                let index = this.getIndex(this.commentComments, comment.id)
                this.commentComments.splice(index, 1)
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
        mounted(){
            this.commentComments = this.comment.comments
            this.commentReplication = JSON.parse(JSON.stringify(this.comment)) 
            if(!this.commentComments){
                this.commentComments = []
            }
            this.commentComments.map(comm =>{
                comm.topicId = this.$route.params.id
            })
        }
    }
</script>

<style scoped>
    .comment-form{
        display: flex;
        align-items: center;
    }
    
    .comment-header{
        display: flex;
        color: #FDF9ED;
        justify-content: space-between;
    }
    .comment-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .comment{
        border-radius: 10px;
        padding-block: 10px;
        width: -webkit-fill-available;
    }
    .comment-info{
        border-radius: 10px;
        padding: 10px;

        background-color: #242424;
    }
    p{
        color: #FDF9ED;
        font-size: 20px
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
    .answer{
        margin-inline: 5px;
    }

    .btn-group{
        display: flex;
        flex-direction: column;
    }

    .text-btn{
        cursor: pointer;
        padding: 6px 10px;
        color: #FDF9ED;
    }
    .text-btn:hover {
        color:#ccc2a6;
    }
    .text-btn:active {
        position:relative;
    }
    .dot{
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: #FDF9ED;;
        border-radius: 50%;
        margin-right: 20px;
    }
    .block{
        display: flex;
        align-items: baseline;
    }
  
</style>