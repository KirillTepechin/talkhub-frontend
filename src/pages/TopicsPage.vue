
<template>
    <div class="main">
        <SortPanel @updateSort="onUpdateSort"></SortPanel>
        <TopicList :sortBy="sortBy" :categories="categories" :allCategoriesIn="allCategoriesIn"></TopicList>
        <FilterPanel @updateFilter="onUpdateFilter"></FilterPanel>
    </div>
</template>

<script>
import SortPanel from '@/components/SortPanel.vue';
import FilterPanel from '@/components/FilterPanel.vue';
import TopicList from '@/components/TopicList.vue';
import SortBy from '@/utils/SortBy';

export default{
    components:{SortPanel, FilterPanel, TopicList},
    data(){
        return{
            sortBy: SortBy.NEW,
            categories:[],
            allCategoriesIn: false
        }
    },
    methods:{
        onUpdateSort(data){
            this.sortBy=data
        },
        onUpdateFilter(data){
            this.categories = data.categories
            this.allCategoriesIn = data.allCategoriesIn
        }
    }
}
</script>

<style scoped>
    .main{
        display: flex;
        margin-top: 70px;
    }
    
</style>