<template>
    <div class="header">
        <div class="logo" @click="home">
            <img src="../assets/logo.jpg">
        </div>
        <div class="content">
            <a href="#" class="button" @click="toCreateTopic">Создать топик</a>
            <a v-if="user?.role == 'MODERATOR'" href="#" class="button" @click="toComplaints">Жалобы</a>
            <div class="search">
                <div class="search-input">
                    <input @focusout="searchText=''; search()" @input="search" type="search" placeholder="Введите для поиска топиков.." v-model="searchText">
                    <img src="../assets/search.jpg">
                </div>
                <div class="finded-topics">
                    <ul v-show="findedTopics.length != 0">
                        <transition-group name="list">
                            <TopicView class="list-item" v-for="topic in findedTopics" v-bind:key="topic" :topic="topic"></TopicView>
                        </transition-group>
                    </ul>
                </div>

            </div>
            <UserView v-if="user" :user="user"></UserView>
            <a v-else class="button" @click="goToLogin($event)">Войти</a>

        </div>

    </div>
</template>

<script>
import UserView from "@/components/UserView.vue";
import TopicService from "@/services/TopicService";
import TopicView from "./TopicView.vue";

import categoryMap from "@/utils/CategoriesConverter"
import UserService from "@/services/UserService";


export default {
    name: "PageHeader",
    components: {
        UserView,
        TopicView,
    },
    data() {
        return {
            user: null,
            searchText: '',
            findedTopics: [],
            timer: null
        }
    },
    methods: {
        home() {
            this.$router.push("/topics")
        },
        goToLogin(e) {
            this.$router.push("/auth")
            e.preventDefault()
        },
        toCreateTopic() {
            this.$router.push("/create-topic")
        },
        toComplaints(){
            this.$router.push("/complaints")
        },
        search() {
            clearTimeout(this.timer)

            this.timer = setTimeout(() => {
                if (this.searchText != '') {
                    TopicService.findAllByQuery(this.searchText).then(response => {
                        response.data = response.data.map(topic => {
                            topic.categories = topic.categories.map(category => categoryMap[category]);
                            return topic;
                        });
                        this.findedTopics = response.data
                    })
                }
                else {
                    this.findedTopics = []
                }
            }, 1500)
        },

    },
    
    mounted() {
        UserService.me().then((response => {
            if (response.data) {
                this.user = response.data
                localStorage.setItem("user", JSON.stringify(response.data))
            }
        }))
    },
    watch:{
        "$route"(){
            this.findedTopics=[]
        }
    }
}     
</script>

<style scoped>
.header {
    top: 0;
    display: flex;
    height: 70px;
    position: fixed;
    z-index: 1;
    width: -webkit-fill-available;
}

.logo {
    width: 20%;
    background-color: #FDF9ED;
    border: 5px solid black;
    padding-block: 5px;
    cursor: pointer;
}

.logo img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
}

.content {
    width: 100%;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.search {
    width: 30%;
}

.search-input {
    display: flex;
    padding-left: 20px;
    background-color: #D9D9D9;
    border: 2px solid;
    border-radius: 20px;
}

.search-input img {
    align-self: center;
    margin-right: 10px;
    width: 30px
}

input {
    outline: none;
    border: hidden;
    padding: 10px;
    font-size: 13pt;
    width: 100%;
    margin-left: 5px;
    background-color: #D9D9D9;
    font-family: "Krub";
}

.finded-topics {
    position: absolute;
    background-color: black;
    max-height: 400px;
    overflow: auto;
    border-radius: 10px;
    width: -webkit-fill-available;
}

ul {
    padding: 10px;
    overflow-x: hidden
}

</style>
