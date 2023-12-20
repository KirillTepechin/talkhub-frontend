<template>
    <div class="topic-view">
        <div class="carousel">
            <Carousel v-if="topic.attachments">
                <Slide v-for="file in files" :key="file">
                    <img :src="'data:image/*;base64,'+ file">
                </Slide>
                <template #addons >
                    <Navigation v-if="files.length>1" />
                </template>
            </Carousel>
            <Carousel v-else>
                <Slide v-for="attachment in 1" :key="attachment">
                    <img src="../assets/no-img.jpg">
                    </Slide>       
            </Carousel>

        </div>
        
        <div class="content" @click="goToTopic">
            <div class="name">
                <h2> {{ topic.name}} </h2>
                <span>{{ topic.date }}</span>
            </div>
            <div class="categories">
                <span v-for="category in topic.categories" v-bind:key="category">{{ category }}</span>
            </div>
            <div class="topic-footer">
                <UserView :user = topic.user></UserView>
                <span class="comments"> {{ topic.commentsCount + ' '+countComments(topic.commentsCount)}} </span>
            </div>
        </div>
    </div>
    
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import UserView from "@/components/UserView.vue"
import FileService from "@/services/FileService"
export default{
    props: {
        topic: Object,
        isComplaint: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Carousel,
        Slide,
        Navigation,
        UserView
    },
    data(){
        return{
            files:[]
        }
    },
    methods:{
        countComments(commentCount){
            switch (commentCount){
                case 1: return "комментарий"
                case 2,3,4: return "комментария"
                default: return "комментариев"
            }
        },
        goToTopic(){
            this.$router.push("/topic/"+this.topic.id)
        }
    },
    mounted(){
        FileService.getFiles(this.topic.attachments).then((response=>{
            this.files=response.data
        }))
    }

}
</script>

<style>
.carousel__slide {
  padding: 10px;
}
.carousel__next, .carousel__prev{
    color:  #FDF9ED !important;
}
</style>
<style scoped>
    .topic-view{
        display: flex;
        background-color: #242424;
        border-radius: 10px;
        margin-block-end: 20px;
        cursor: pointer;
    }
    .name{
        display: flex;
        align-self: flex-start;
        justify-content: space-between;
        width: -webkit-fill-available;
        color: #FDF9ED;
        margin:0;
    }
    h2{
        margin: 0;
    }
    .content{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: -webkit-fill-available;
        padding-block: 10px;
    }
    img{
        width: 130px;
        height: 130px;
        border-radius: 10%;
        object-fit: cover;
    }
    .categories{
        display: flex;
        flex-wrap: wrap;
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
    .topic-footer{
        display: flex;
        justify-content: space-between;
    }
    .comments{
        color: #FDF9ED;
        align-self: center;
        margin-inline-end: 20%
    }
    .carousel{
        width: 200px;
        margin: auto;
    }
    
</style>