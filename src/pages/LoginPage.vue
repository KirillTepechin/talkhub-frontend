<template>
    <form>
        <h1>Вход</h1>
        <div class="error" v-if="this.wrongData">
          <label>Неверный логин или пароль</label>
        </div>
       <input class="form-input"
        v-model="user.login"
        type = "text"
        placeholder="Логин"
        />
        <input class="form-input"
        v-model="user.password"
        type = "password"
        placeholder = "Пароль"
        />                
        <div class="btn-bar">
            <a class="button" @click="login($event)">Войти</a>
            <a class="button" @click="goToRegistration($event)">Регистрация</a>
        </div>     
    </form>
</template>

<script>

import UserService from "@/services/UserService";

export default {
    
    data(){
      return {
        user:{},
        wrongData: false
      }
    },
    methods: {
      login(e) {       
        UserService.login(this.user).then(response => {
          localStorage.setItem('jwt', response.data)
          window.location.href = '/topics'
        }
        ).catch(() =>{
          this.wrongData = true
        })
        e.preventDefault()
      },
      goToRegistration(e){
        this.$router.push('/registration')
        e.preventDefault()
      }
    },
    mounted(){
      if(localStorage.getItem("user")!=null){
        this.$router.push("/topics")
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
.btn-bar{
    display: flex;
    justify-content: space-evenly;
}

.error{
  padding: 10px;
    background-color: #ffb6b6;
    margin: 10px 50px;
    border: 1px solid;
    border-radius: 10px;
    border-color: #ed5656;
    display: flex;
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