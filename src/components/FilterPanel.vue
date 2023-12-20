<template>
    <div class="filter-panel">
        <h2>Выбранные категории:</h2>
        <VueMultiselect
            v-model="selectedCategories"
            :options="categories"
            :multiple="true"
            :placeholder="'Выберите категории'"
            :selectedLabel	="'Выбрано'"
            :selectLabel = "'Нажмите для выбора'"
            :deselectLabel = "'Нажмите для отмены'">
            <template v-slot:noResult>
                Нет результатов поиска
            </template>
        </VueMultiselect>
        <div class="toggle" v-show="toggleDisplay">
            <Toggle class="toggle-custom"
            offLabel="Или"
            onLabel="И"
            v-model="allCategoriesIn" />
        </div>
    </div>
</template>

<script>

import VueMultiselect from 'vue-multiselect'
import Toggle from '@vueform/toggle'

export default{
    props:{
        toggleDisplay: {default: true},
        presetCategories:{default:[]}
    },
    data(){
        return{
            categories:["IT", "Финансы","Игры","Музыка","Политика","Спорт","Книги","Фильмы и сериалы","Еда и напитки", "Путешествия"],
            selectedCategories:[],
            allCategoriesIn:false,
        }
    },
    components:{VueMultiselect, Toggle},
    updated(){
        if(this.presetCategories.length>0){
            this.selectedCategories = JSON.parse(JSON.stringify(this.presetCategories)) 
        }
    },
    watch: {
        'selectedCategories'() {
            this.$emit('updateFilter',
                {
                    categories: this.selectedCategories,
                    allCategoriesIn: this.allCategoriesIn
                }
            )
        },
        'allCategoriesIn'() {
            this.$emit('updateFilter',
                {
                    categories: this.selectedCategories,
                    allCategoriesIn: this.allCategoriesIn
                }
            )
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style src="@vueform/toggle/themes/default.css"></style>

<style scoped>
.filter-panel{
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

    h2{
        color: #FDF9ED;
        margin:0;
        align-self: center;
    }

    label{
        font-size: 25px;
        cursor: pointer;
    }
    .toggle{
        align-self: center;
        margin-right: 40px;
    }
    
</style>

<style>
 .multiselect__tag{
        border: #000000 solid 2px;
        border-radius: 10px;
        background: #FDF9ED;
        color: black;
        font-size: 20px;
    }
    .multiselect__tags{
        background: #FDF9ED;
        border-radius: 20px;

    }
    .multiselect__placeholder{
        font-size: 20px;

        font-family: 'Krub';
        font-style: normal;
        color: black;
    }
    .multiselect__input{
        font-size: 20px;
        background:#FDF9ED ;
        font-family: 'Krub';
        font-style: normal;
        color: black;

    }
     .multiselect__option--highlight{
        font-size: 20px;
        font-family: 'Krub';
        font-style: normal;
        color: black;

    }
    .multiselect__option--highlight::after{
        font-size: 10px;
        font-family: 'Krub';
        font-style: normal;
        color: black;

    }

    .multiselect__option{
        font-size: 20px;
        font-family: 'Krub';
        font-style: normal;
        color: black;

    } 

    .multiselect__element{
        background: #FDF9ED;
    }

    .multiselect__option--selected.multiselect__option--highlight{
        color :#FDF9ED;
    }
    .multiselect__option--selected multiselect__option{
        color :#FDF9ED;
    }
    .multiselect__option--selected multiselect__option{
        background: #FDF9ED;
    }
    .multiselect__option--selected{
        background: #FDF9ED;
    }

    .toggle-custom{
        --toggle-width: 80px;
        --toggle-height: 30px;
        --toggle-font-size: 20px;


        --toggle-bg-on: black;
        --toggle-bg-off: #FDF9ED;
    
        --toggle-border-on: #FDF9ED;
        --toggle-border-off: #D9D9D9;
        --toggle-border-on-disabled: red;
        --toggle-border-off-disabled: red;
        --toggle-ring-color: black;
    }
</style>
