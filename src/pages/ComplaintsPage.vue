<template>
    <div class="complaints">
        <h1>Жалобы</h1>
        <transition name="fade">
            <h2 v-if="complaints?.length == 0">Нет жалоб</h2>
        </transition>
        <div class="complaints-list">
            <TransitionGroup name="list-complete">
            <div v-for="complaint in complaints" v-bind:key="complaint" class="complaint list-complete-item">
                <p>Количество жалоб: {{ complaint.complaints.length }}</p>
                <div class="clickable" @click="goToComment(complaint.comment)">
                    <TopicView v-if="complaint.topic" :topic="complaint.topic" :isComplaint="true"></TopicView>
                    <CommentView  v-else :comment = "complaint.comment" :isComplaint="true" ></CommentView>
                </div>
                <div class="btn-group">
                    <a class="button" @click="approve(complaint)">Принять</a>
                    <a class="button" @click="dismiss(complaint)">Отклонить</a>
                </div>
            </div>
            </TransitionGroup>
        </div>
        
        
    </div>
</template>

<script>
    import CommentView from "@/components/CommentView.vue";
    import TopicView from "@/components/TopicView.vue";
    import ComplaintService from "@/services/ComplaintService";
    import categoryMap from "@/utils/CategoriesConverter"

    export default{
    components: { TopicView, CommentView },

    data() {
        return {
            complaints: []
        };
    },
    methods:{
        goToComment(comment){
            if(comment){
                this.$router.push("topic/" +comment.topicId + "/?comment="+comment.id)
            }
        },
        approve(complaint){
            if(complaint.complaintType == "ON_TOPIC"){
                let complaintRequest = {id: complaint.topic.id, complaintType: complaint.complaintType}
                ComplaintService.approveComplaint(complaintRequest).then(()=>{
                    let index = this.getIndexTopic(this.complaints, complaint.topic.id)
                    this.complaints.splice(index, 1)
                })
            }
            else{
                let complaintRequest = {id: complaint.comment.id, complaintType: complaint.complaintType}
                ComplaintService.approveComplaint(complaintRequest).then(()=>{
                    let index = this.getIndexComment(this.complaints, complaint.comment.id)
                    this.complaints.splice(index, 1)
                })
            }
        },
        dismiss(complaint){
            if(complaint.complaintType == "ON_TOPIC"){
                let complaintRequest = {id: complaint.topic.id, complaintType: complaint.complaintType}
                ComplaintService.dismissComplaint(complaintRequest).then(()=>{
                    let index = this.getIndexTopic(this.complaints, complaint.topic.id)
                    this.complaints.splice(index, 1)
                })
            }
            else{
                let complaintRequest = {id: complaint.comment.id, complaintType: complaint.complaintType}
                ComplaintService.dismissComplaint(complaintRequest).then(()=>{
                    let index = this.getIndexComment(this.complaints, complaint.comment.id)
                    this.complaints.splice(index, 1)
                })
            }
        },
        getIndexTopic(list, id) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].topic?.id === id) {
                    return i;
                }
            }
            return -1;
        },
        getIndexComment(list, id) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].comment?.id === id) {
                    return i;
                }
            }
            return -1;
        },
    },
    mounted() {
        ComplaintService.getComplaints().then(response => {
            if(response){
                response.data = response.data.map(complaint => {
                if (complaint.topic) {
                    complaint.topic.categories = complaint.topic.categories.map(category => categoryMap[category]);
                }
                return complaint;
            });
            this.complaints = response.data
            }
            
        });
    },
}
</script>

<style scoped>
    .complaints{
        top: 100px; left: 50%;
        transform: translate(-50%, -0%);
        position: absolute;
        display: flex;
        background-color: black;
        border-radius: 10px;
        flex-direction: column;
        justify-content: space-evenly;
        width: -moz-max-content;
        width: max-content;
        padding: 10px;
        width: 650px;
    }
    h1{
        color: #FDF9ED;
        white-space: nowrap;
        margin-inline: 35px;
        display: inline-block;
        align-self: center;
    }
    p{
        color: #FDF9ED;
        text-align: center;
    }
    .btn-group{
        display: flex;
        justify-content: space-evenly;
    }
    .complaint{
        width: -webkit-fill-available;
        border-bottom: solid 2px;
        border-top: solid 2px;
        padding: 10px;
        border-color: #D9D9D9;
    }
    .clickable{
        cursor: pointer;
    }
    
    h2{
        color: #FDF9ED;
        align-self: center;
    }

    .complaints-list{
        overflow: auto;
        height: 510px;
    }

    .complaints-list::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: black;
    }

    .complaints-list::-webkit-scrollbar
    {
        width: 12px;
        background-color: black;
    }

    .complaints-list::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #FDF9ED;
    }
</style>