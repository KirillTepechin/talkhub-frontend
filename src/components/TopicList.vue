<template>
        <div class="topic-panel">
            <h3 v-if="sortBy == 'new' && categories.length != 0">Новые топики по категориям: {{ categories.join() }}</h3>
            <h3 v-else-if="sortBy == 'popular' && categories.length != 0">Популярные топики по категориям: {{
                categories.join()
            }}</h3>
            <h3 v-else-if="sortBy == 'popular'">Популярные топики</h3>
            <h3 v-else>Новые топики</h3>
            <transition name="fade">
                <h2 v-if="topics.length == 0">Нет топиков удовлетворяющих запросу</h2>
            </transition>
            <div v-if="topics.length > 0" class="topic-list">
                <transition-group name="list-complete">
                    <TopicView class="list-complete-item" :topic="topic" v-for="topic in topics" v-bind:key="topic.id" style="margin-right: 10px;">
                    </TopicView>
                </transition-group>
            </div>
        </div>
</template>

<script>
import TopicService from "@/services/TopicService"
import categoryMap from "@/utils/CategoriesConverter"
import TopicView from "@/components/TopicView.vue"
export default {
    props: ['sortBy', 'categories', 'allCategoriesIn'],
    components: { TopicView },
    data() {
        return {
            topics: Array
        }
    },
    methods: {
        loadData() {
            if (this.sortBy == 'new') {
                TopicService.findAllByNew(this.categories, this.allCategoriesIn).then(response => {
                    response.data = response.data.map(topic => {
                        topic.categories = topic.categories.map(category => categoryMap[category]);
                        return topic;
                    });
                    this.topics = response.data
                })
            }
            else {
                TopicService.findAllByPopular(this.categories, this.allCategoriesIn).then(response => {
                    response.data = response.data.map(topic => {
                        topic.categories = topic.categories.map(category => categoryMap[category]);
                        return topic;
                    });
                    this.topics = response.data
                })
            }
        }
    },
    mounted() {
        this.loadData()
    },
    watch: {
        "sortBy"() {
            this.loadData()
        },
        "categories"() {
            this.loadData()
        },
        "allCategoriesIn"() {
            this.loadData()
        }
    }
}
</script>

<style scoped>
.topic-panel {
    background-color: black;
    border-radius: 10px;
    margin-inline: 50px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: max-content;
    padding: 10px;
    width: 650px;
    
    margin-block:20px

}

h3 {
    color: #FDF9ED;
    margin: 0;
    align-self: center;
}

h2 {
    color: #FDF9ED;
    align-self: center;
}
    .topic-list{
        overflow: auto;
        height: 580px;
    }

  .topic-list::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: black;
    }

    .topic-list::-webkit-scrollbar
    {
        width: 12px;
        background-color: black;
        margin-left: 10px;
    }

    .topic-list::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #FDF9ED;

    }

</style>