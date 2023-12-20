<template>
    <div v-if="user">
        <img v-if="user?.photo" :src="'data:image/*;base64,'+ file">
        <img v-else src="../assets/profile.jpg">
        <label>{{ user?.login }}</label>
        <div v-show="this.$parent.$options.name == 'PageHeader'" class="triangle">
            <svg @click="opened=!opened" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 12L13.0622 0.75H0.937822L7 12Z" fill="#FDF9ED" />
            </svg>
            <Transition name="fade">
                <div v-show="opened" class="menu-items">
                <ul @mouseleave="opened=false">
                    <li><a @click="goToProfile" class="button">Профиль</a></li>
                    <li><a @click="logout" class="button">Выйти</a></li>
                </ul>
            </div>
            </Transition>
           
        </div>

    </div>
</template>

<script>
import FileService from '@/services/FileService'


export default {
    props: ["user"],
    data(){
        return{
            opened: false,
            file: null
        }
    },
    methods:{
        logout(){
            localStorage.removeItem("jwt")
            localStorage.removeItem("user")
            this.$router.push("/auth")
        },
        goToProfile(){
            this.$router.push("/profile")
        },
        getFile(){
            if(this.user){
                FileService.getFile(this.user.photo).then((response=>{
                    this.file = response.data
                }))
            }
        },
    },
    mounted(){
        this.getFile()
    },
    watch:{
        "user.photo"(){
            this.getFile()

        }
    }

}
</script>

<style scoped>
div {
    display: flex;
}

img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
}

label {
    margin-left: 10px;
    color: white;
    align-self: center;
}

.triangle {
    align-self: center;
    margin-left: 10px;
}
svg{
    cursor: pointer;
}
ul{
    width: -webkit-fill-available;
    padding: 10px;
    margin: auto;
}
li{
    display: block;
    color: #FDF9ED;
}
.menu-items{
    position: absolute;
    top:70px;
    right: 1px;
    background-color: black;
    border-radius: 10px;
    min-width: 200px;
}
a{
    width: -webkit-fill-available !important;
    padding: 5px !important;
}
</style>
