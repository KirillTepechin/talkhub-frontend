<template>
        <input class="form-input"
            v-model="userCredentials.login"
            type = "text"
            placeholder="Новый логин"
        />
        <input class="form-input"
        v-model="userCredentials.password"
        type = "password"
        placeholder = "Старый пароль">
        <input class="form-input"
        v-model="userCredentials.newPassword"
        type = "password"
        placeholder = "Новый пароль"
        />       
        <a @click="editCredentials" class="button">Сохранить</a>   
              
</template>

<script>
import UserService from '@/services/UserService';

export default{
    name:"CredentialsEdit",
    data(){
        return{
            user: null,
            userCredentials:{},
            wrongData:[]
        }
    },
    methods: {
        editCredentials() {
            this.valid()
            if (this.wrongData.length == 0) {
                UserService.editCredentials(this.userCredentials).then(() => {
                    localStorage.removeItem("jwt")
                    localStorage.removeItem("user")
                    this.$router.push("/auth")
                
                }).catch(()=>{
                    this.wrongData.push('wrong password')
                })
            }
        },
        valid(){
             //Логин
             if (this.userCredentials.login == '' || this.userCredentials.login.length < 3 || this.userCredentials.login.length > 30) {
                this.wrongData.push('login')
            } else {
                if (this.wrongData.includes('login')) this.wrongData.splice(this.getIndex(this.wrongData, 'login'), 1)
            }
            //Пароль
            if (this.userCredentials.password == '' || this.userCredentials.password.length < 3 || this.userCredentials.password.length > 30) {
                this.wrongData.push('password')
            } else {
                if (this.wrongData.includes('password')) this.wrongData.splice(this.getIndex(this.wrongData, 'password'), 1)
            }
            //Новый пароль
            if (this.userCredentials.newPassword == '' || this.userCredentials.newPassword.length < 3 || this.userCredentials.newPassword.length > 30) {
                this.wrongData.push('password')
            } else {
                if (this.wrongData.includes('newPassword')) this.wrongData.splice(this.getIndex(this.wrongData, 'newPassword'), 1)
            }
        }
    },
    mounted(){
        this.user = JSON.parse(localStorage.getItem("user"))
        this.userCredentials.login = this.user.login
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
    align-self: center !important;
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