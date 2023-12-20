<template>
    <form @submit.prevent>
        <h1>Регистрация</h1>
        <div class="error" v-if="userAlreadyExist">
            <label>Пользователь '{{ user.login }}' уже существует</label>
        </div>   
        <div class="error" v-if="wrongData.includes('login')">
            <label>Поле "Логин" должно быть заполнено</label>
        </div>       
       <input class="form-input"
        v-model="user.login"
        type = "text"
        placeholder="Логин"
        />
        <div class="error" v-if="wrongData.includes('password')">
            <label>Поле "Пароль" должно быть заполнено</label>
        </div>     
        <input class="form-input"
        v-model="user.password"
        type = "password"
        placeholder = "Пароль"
        />                
        <div class="btn-bar">
            <a class="button" @click="register($event)">Зарегистрироваться</a>
        </div>     
    </form>
</template>
<script>

import UserService from "@/services/UserService";

export default {
    data() {
      return {
        errors:[],
        wrongData:[],
        user:{},
        userAlreadyExist: false,
      }
    },
    methods:{
        register(e){
            //Логин
            if(this.user.login == '' || this.user.login.length < 3 || this.user.login.length > 30){
                this.wrongData.push('login')                
            }else{
                if(this.wrongData.includes('login')) this.wrongData.splice(this.getIndex(this.wrongData, 'login'), 1)
            }
            //Пароль
            if(this.user.password == '' || this.user.password.length < 3 || this.user.password.length > 30){
                this.wrongData.push('password')
            }else{
                if(this.wrongData.includes('password')) this.wrongData.splice(this.getIndex(this.wrongData, 'password'), 1)
            }

            if(this.wrongData.length == 0){
                UserService.register(this.user).then( ()=>{
                    this.$router.push("/auth")
                })
            }
            
            e.preventDefault()
        },
        getIndex(list, str) {
            for (let i = 0; i < list.length; i++) {
                if (list[i] === str) {
                    return i;
                }
            }
            return -1;
        },
        checkExistLogin(){
            UserService.exist(this.user.login).then(response =>{
                if(response.data){
                    this.userAlreadyExist = true                     
                }
                else{
                    this.userAlreadyExist = false
                } 
            })
        }
    },
    watch:{
        'user.login'(){
            this.checkExistLogin()
        }
    }
}
</script>

<style scoped>
form{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px; 
    width: 500px;
    flex-direction: column;
    position: absolute;
    background-color: black;
    border-radius: 30px; 

    top: 50%; left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.button{
    margin-inline: 10px;
    min-width: 170px;
    margin-top: 30px;
    margin-bottom: 30px;
}
label{
  font-size: 11.5pt;
  color: #b10000;
}
h1{
  color: #FDF9ED;
}
input{
  margin-inline: 35px;
  margin-block: 10px;
}
</style>