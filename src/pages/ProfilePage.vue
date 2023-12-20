<template> 
    <form>
        <select v-model="selected">
            <option >
                Фото
            </option>
            <option>
                Данные входа
            </option>
        </select>
        <router-view v-slot="{ route }">
            <Transition name="slide-fade" mode="out-in" appear>
                <div :key="route.query" style="text-align: center;">  
                    <KeepAlive>
                        <component :is="activeComponent"></component>
                    </KeepAlive>
                </div>
            </Transition>
        </router-view>
    </form>
</template>

<script>
import CredentialsEdit from '@/components/CredentialsEdit.vue';
import PhotoEdit from '@/components/PhotoEdit.vue'

export default{
    components: { PhotoEdit, CredentialsEdit },
    data() {
        return {
            selected: String,
            activeComponent: 'PhotoEdit'
        };
    },
    mounted(){
        if(this.$route.query.edit == "credentials"){
            this.selected = "Данные входа"
            this.activeComponent = "CredentialsEdit"
            this.$router.push({path: "/profile", query: {edit: "credentials"} })
        }
        else{
            this.selected = "Фото"
            this.activeComponent = "PhotoEdit"
            this.$router.push({path: "/profile", query: {edit: "photo"} })
        }
    },
    watch: {
        "selected"() {
            if (this.selected == "Фото") {
                this.activeComponent = "PhotoEdit"
                this.$router.push({path: "/profile", query: {edit: "photo"} })
            }
            else {
                this.activeComponent = "CredentialsEdit"
                this.$router.push({path: "/profile", query: {edit: "credentials"} })
            }
        },
    },
   
}
</script>

<style scoped>
    form{
        display: flex;
        justify-content: space-evenly;
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
    select{
        outline: none;
        font-size: 20px;
        background:#FDF9ED ;
        font-family: 'Krub';
        font-style: normal;
        color: black;
        border-radius: 10px;
        height: 50px;
        width: -webkit-fill-available;
        margin-inline: 10px;
        text-align: center;
        font-weight: bold;
        margin-bottom: 10px;
    }
    option{
        font-size: 20px;
        background:#FDF9ED ;
        font-family: 'Krub';
        font-style: normal;
        color: black;
        border-radius: 10px;
        height: 50px;
        width: -webkit-fill-available;
        margin-inline: 10px;
        text-align: center;
        font-weight: bold;
    }
    .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(2em);
    opacity: 0;
  }

</style>
