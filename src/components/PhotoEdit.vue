<template>
        <div style="display: flex; flex-direction: column; align-items: center;">
            <img v-if="user?.photo" :src="'data:image/*;base64,'+ file">
            <img v-else src="../assets/profile.jpg">
            <span>{{ user?.login }}</span>
            <div class="button-panel">
            <label class="custom-file-upload">
            <input @input="onFileChange($event)" type="file" accept="image/*"/>
            Выбрать изображение
            </label>
            <a @click="editPhoto" class="button">Сохранить</a>
        </div>
        </div>
        
        
</template>

<script>
import FileService from '@/services/FileService';
import UserService from '@/services/UserService';

    export default{
        name:"PhotoEdit",
        data(){
            return{
                user: null,
                file: null
            }
        },
        methods:{
            onFileChange(e){
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                var reader = new FileReader();                
                reader.onload = (e) => {
                    document.querySelector("#app > form > div > div > img").src = e.target.result
                };
                reader.readAsDataURL(file)
                this.file=file
                
            },
            editPhoto(){
                if(this.file!=null){
                    UserService.editPhoto(this.file).then((response)=>{
                        if(response.status==200){
                            var reader = new FileReader();
                            reader.readAsDataURL(this.file);
                            reader.onload = function (e) {
                                document.querySelector("#app > div > div.content > div:nth-child(3) > img").src = e.target.result
                                document.querySelector("#app > form > div > div > img").src = e.target.result

                            };
                            UserService.me().then((response => {
                                if (response.data) {
                                    this.user = response.data
                                    localStorage.setItem("user", JSON.stringify(response.data))
                                }
                            }))
                            alert("Данные сохранены")
                        }
                    })
                }
            }
        },
        mounted(){
            this.user = JSON.parse(localStorage.getItem("user"))
            if(this.user.photo){
                FileService.getFile(this.user.photo).then((response=>{
                    this.file = response.data
                }))
            }
        }
    }
</script>

<style scoped>
    img {
        border-radius: 50%;
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

    span {
        color: white;
        align-self: center;
        font-size: 30px;
    }

    
    .button-panel{
        display: flex;
        flex-direction: column;
    }
    a{
        margin: 10px;
    }
</style>