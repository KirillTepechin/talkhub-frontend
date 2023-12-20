<template>
    <div class="sort-panel">
        <h2>Показывать сначала...</h2>
        <div class="choice" @click="sortByNew($event)">
            <label>Новые</label>
            <div v-show="sortBy=='new'" class="ellipse"></div>
        </div>
        <div class="choice" @click="sortByPopular($event)">
            <label>Популярные</label>
            <div v-show="sortBy=='popular'" class="ellipse"></div>
        </div>
    </div>
</template>

<script>

import SortBy from "@/utils/SortBy"

export default{
    
    data(){
        return{
            sortBy: SortBy.NEW
        }
    },
    methods:{
        sortByNew(e){
            this.sortBy = SortBy.NEW
            this.$emit('updateSort', 
                this.sortBy,
            )

            e.preventDefault()
        },
        sortByPopular(e){
            this.sortBy = SortBy.POPULAR
            this.$emit('updateSort', 
                this.sortBy,
            )
            
            e.preventDefault()
        },
    },
    mounted(){
        this.$emit('updateSort', 
           this.sortBy,
        )
    }
}
</script>

<style scoped>
    .sort-panel{
        background-color: black;
        border-radius: 10px;
        margin-inline: 50px;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 200px;
        width: 300px;
        padding: 10px;
    }
    h2{
        color: #FDF9ED;
        margin:0;
        align-self: center;
    }
    .choice{
        display: flex;
        background-color: #FDF9ED;
        cursor: pointer;
        border-radius: 10px;
        justify-content: center;
    }
    .choice:active{
        position:relative;
        top:1px;
    }
    .choice:hover{
        background-color:#ccc2a6;
    }
   
    .ellipse{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #000000;
        align-self: center;
        margin-left: 10px;
    }

    label{
        font-size: 25px;
        cursor: pointer;
    }
    
</style>