<template>
    <div class="topic">
        <TopicHeader :topic="topic"></TopicHeader>
        <TopicContent :topic="topic"></TopicContent>
        <TopicComments :comments = "topic.comments"></TopicComments>
    </div>

</template>

<script>
import TopicComments from '@/components/TopicComments.vue';
import TopicContent from '@/components/TopicContent.vue';
import TopicHeader from '@/components/TopicHeader.vue';
import TopicService from '@/services/TopicService';
import categoryMap from '@/utils/CategoriesConverter';
export default{
    components:{ TopicHeader, TopicContent, TopicComments },
    data(){
        return{
            topic:{}
        }
    },
    methods:{
        loadData(){
            TopicService.findTopic(this.$route.params.id).then(response=>{
                if(response){
                    this.topic = response.data
                    this.topic.categories = this.topic.categories.map(category => categoryMap[category]);
                }
            })
        },
        
    },
    mounted(){
        this.loadData()
        if (this.$route.query.comment) {
            setTimeout(() => {
                var comment = document.getElementById(this.$route.query.comment)
                if(comment){
                    comment.classList.add("flashing")
                    comment.scrollIntoView({ behavior: "smooth", block: "center" })
                }
                
            }, 500);
            
        }
    },
    watch: {
        '$route'() {
            this.loadData()
        }
    }
}
</script>

<style scoped>
.topic{
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>