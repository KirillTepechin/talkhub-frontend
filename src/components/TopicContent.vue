<template>
    <div class="content">
        <div class="content-header">
            <UserView :user="topic.user"></UserView>
            <span>{{ topic.date }}</span>
        </div>
        <p>{{ topic.text }}</p>
    </div>
</template>

<script>
import UserView from './UserView.vue';

export default{
    props: ["topic"],
    components: { UserView }
}
</script>

<style scoped>
    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        background-color: black;
        border-radius: 10px;
        padding: 10px;

        width: 800px;
    }
    .content-header{
        display: flex;
        align-self: flex-start;
        justify-content: space-between;
        width: -webkit-fill-available;
        color: #FDF9ED;
        margin:0;
    }
    p{
        color:#FDF9ED;
        font-size: 20px;
    }
</style>