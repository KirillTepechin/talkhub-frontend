<template>
    <PopUpDialog
      v-show="isShowModalDelete"
      text='Вы действительно хотите удалить топик?'
      @modalAction="onModalActionDelete"
    />

    <PopUpDialog
      v-show="isShowModalComplaint"
      text='Вы действительно хотите подать жалобу на этот топик?'
      @modalAction="onModalActionComplaint"
    />
    <div style="display: flex;">
        <div class="topic-header">
        <div class="name">
            <h1>{{ topic.name }}</h1>
            <div class="categories">
                <span v-for="category in topic.categories" v-bind:key="category">{{ category }}</span>
            </div>
        </div>
        <div class="carousel" v-if="topic.attachments">
            <h2>Приложения:</h2>
            <Carousel>
                <Slide v-for="file in files" :key="file">
                    <img :src="'data:image/*;base64,'+ file">
                </Slide>
                <template #addons >
                    <Navigation v-if="files.length>1" />
                </template>
            </Carousel>
        </div>
        
    </div>
    <div class="btn-group">
        <a class="button" id = "small" @click="toggleModalCompaint">Пожаловаться</a>
        <a v-if="topic.user?.login == getCurrentUser()" class="button delete" id = "small" @click="toggleModalDelete">Удалить</a>
        <a v-if="topic.user?.login == getCurrentUser()" class="button edit" id = "small" @click="editTopic">Изменить</a>
    </div>
    </div>
    

</template>
<script>

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import FileService from '@/services/FileService';
import ComplaintService from '@/services/ComplaintService';
import TopicService from '@/services/TopicService';
import PopUpDialog from "@/pop-up/PopUpDialog.vue"

export default {
    components: {
        Carousel,
        Slide,
        Navigation,
        PopUpDialog
    },
    props: {
        topic: Object
    },
    data(){
        return{
            files:[],
            isShowModalDelete: false,
            isShowModalComplaint: false,
        }
    },
    methods:{
        complaint(){
            let complaint = {complaintType: "ON_TOPIC", id: this.$route.params.id}
            ComplaintService.createComplaint(complaint).then(response=>{
                if(response){
                    alert("Жалоба подана на рассмотрение")
                }
            })
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
        onModalActionDelete(flag) {
            if (!flag) {
                this.isShowModalDelete = false
            }
            else {
                TopicService.deleteTopic(this.topic.id).then(()=>{
                    this.$router.push("/")
                    this.$forceUpdate()
                }
            )}
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
        editTopic(){
            this.$router.push("/edit-topic/"+this.$route.params.id)
        }
    },
    mounted(){
        FileService.getFiles(this.topic.attachments).then((response => {
            this.files = response.data
        }))
    },
    watch:{
        "topic.attachments"(){
            FileService.getFiles(this.topic.attachments).then((response => {
                this.files = response.data
            }))
        }
    }
}
</script>

<style scoped>
    .topic-header{
        display: flex;
        align-items: flex-start;
        justify-content: center;
        margin-top: 100px;
        background-color: black;
        border-radius: 10px;
        padding: 10px;

        width: 800px;
        margin-left: 320px; 
    }
    h1,h2{
        color: #FDF9ED;
    }
    .categories{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .categories span{
        color: black;
        background-color: #FDF9ED;
        border-radius: 10px;
        margin-inline-end: 5px;
        padding: 3px;
        border: solid 2px;
        border-color: black;
    }
    
    .carousel img{
        max-width:50%;
    }

    .name{
        width: -webkit-fill-available;
        text-align: center;
    }

    /* .button{
        position: absolute;
        right: calc((100vw - 800px) / 2);
        width: 120px;
    }
    .delete{
       top: 150px
    }
    a.button:active{
        position: absolute;
        top: auto;
    } 
    a.delete:active{
        position: absolute;
        top: 150px
    } 

    .edit{
       top: 190px
    }

    a.edit:active{
        position: absolute;
        top: 190px
    }  */

    .btn-group{
        display: flex;
        flex-direction: column;
        margin-top: 100px;
        margin-left: 100px; 

        background-color: black;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 200px;
        width: 200px;
        padding: 10px;
    }
</style>