<template>
   <div class="topic-form">
        <div>
            <h1>Напишите заголовок топика</h1>
            <span class="error" v-show="wrongData.includes('name')">*</span>
        </div>
        <input class="form-input"
         v-model="topic.name"
         type = "text"
         placeholder="Заголовок топика"
        />
        <div>
            <h1> Напишите текст топика</h1>
            <span class="error" v-show="wrongData.includes('text')">*</span>
        </div>
        <textarea
         v-model="topic.text"
         rows="5"
         type="text"  
         placeholder="Текст топика">
        </textarea>
        <div>
            <h1>Выберите категории топика</h1>
            <span class="error" v-show="wrongData.includes('categories')">*</span>

        </div>
        <FilterPanel :toggleDisplay="false" :presetCategories="topic.categories" @updateFilter="onUpdateFilter" class="no-margin"></FilterPanel>   
        <h1>Добавьте до 3-х изображений (необязательно)</h1>   
        <label class="custom-file-upload"  v-bind:class="{ disabled: filesDisabled }">
            <input v-show="filesDisabled" @input="onFileChange($event)" type="file" accept="image/*"/>
           Добавить изображение
        </label>
        <div class="images-panel" >
            <div v-for="file in files" v-bind:key="file" class="image-panel">
                <img :src="file.base64" >
                <span @click="removeImg(file)">x</span>
            </div>
           
        </div>
        <a v-if="this.$route.name=='create-topic'" class="button" id="last-button" @click="createTopic($event)">Опубликовать топик</a>  
        <a v-else class="button" id="last-button" @click="editTopic($event)">Изменить топик</a>  
    </div>
   
</template>

<script>
import FilterPanel from '@/components/FilterPanel.vue';
import TopicService from '@/services/TopicService';
import FileService from "@/services/FileService"
import categoryMap from '@/utils/CategoriesConverter';

export default{
    components:{FilterPanel},
    data(){
        return{
            topic:{},
            files:[],
            filesDisabled:false,
            wrongData:[]
        }
    },
    methods:{
        onUpdateFilter(data){
            this.topic.categories=data.categories
        },
        onFileChange(e){
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var reader = new FileReader();
            var vm = this;
            
            reader.onload = (e) => {
                vm.files.push({base64: e.target.result, name: file.name})
                if(vm.files.length>2){
                    vm.filesDisabled=true
                }
            };
            reader.readAsDataURL(file)
            
        },
        removeImg(file){
            this.files.splice(this.files.indexOf(file), 1)
            this.filesDisabled=false
        },
        createTopic(e){
            this.wrongData=[]
            if(!this.validation()){
                return
            }
            let topic=this.topic
            topic.binaryAttachments = this.files
            TopicService.createTopic(topic).then((response)=>{
                if(response){
                    this.$router.push("/topic/" + response.data.id)
                }
            })
            e.preventDefault()
        },
        editTopic(e){
            this.wrongData=[]
            if(!this.validation()){
                return
            }
            let topic=this.topic
            topic.binaryAttachments = this.files
            TopicService.editTopic(topic).then((response)=>{
                if(response){
                    this.$router.push("/topic/" + response.data.id)
                }
            })
            e.preventDefault()
        },
        validation(){
            let valid = true
            if(this.topic.name==null || this.topic.name==''){
                this.wrongData.push("name")
                valid=false
            }
            if(this.topic.text==null || this.topic.text==''){
                this.wrongData.push("text")
                valid=false
            }
            if(this.topic.categories==null || this.topic.categories.length==0){
                this.wrongData.push("categories")
                valid=false
            }

            return valid
        }
        
    },
    mounted(){
        if(this.$route.name=="edit-topic"){
            TopicService.findTopic(this.$route.params.id).then(response=>{
                this.topic = response.data;
                this.topic.categories = this.topic.categories.map(category => categoryMap[category])
                FileService.getFiles(this.topic.attachments).then((response=>{
                    this.files=response.data
                    this.files = this.files.map((file)=>({name: file.length , base64: 'data:image/*;base64,' + file}))
                })) 
            })
        }
    },
    watch:{
        "filesDisabled"(){
            if(this.filesDisabled){
                document.querySelector("#app > div.topic-form > label > input[type=file]").disabled=true
            }
            else{
                document.querySelector("#app > div.topic-form > label > input[type=file]").disabled=false
            }
        }
    } 
}
</script>

<style scoped>
.topic-form{
    top: 100px; left: 50%;
    transform: translate(-50%, -0%);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  
    flex-direction: column;
    background-color: black;
    border-radius: 30px; 
}
.topic-form:after {
    position: absolute;
    content: "";
    bottom: -40px;
    height: 40px;
    width: 1px;
}
h1{
  color: #FDF9ED;
  white-space: nowrap;
}
.form-input{
    margin-inline: 35px;
}
textarea{
    background-color: #D9D9D9;
    border-radius: 10px;
    width: -webkit-fill-available;
    font-size: 25px;
    margin-inline: 35px;

    outline: none;
    border: hidden;
    font-family: 'Krub';
    font-style: normal;
    font-weight: 700; 

    resize: vertical;

}
h1{
    margin-inline: 35px;
    display: inline-block;
}

.no-margin{
    margin-top: -25px;
    margin-bottom: -25px;
}

#last-button{
    margin-bottom: 10px;
}

.images-panel{
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #D9D9D9;
    height: 100px;
    width: -webkit-fill-available;
    margin-inline: 35px;
    margin-block: 20px;
    border-radius: 10px;
}
.images-panel span{
    vertical-align:middle;
    cursor: pointer;
}
.image-panel{
    display: flex;
    align-items: center;
}
img{
    margin: 0;
    max-height: 70px;
    object-fit: contain;
}

.disabled{
    cursor:auto;
    background-color:#dddddd;
}
.error{
    color: red;
    
}
</style>