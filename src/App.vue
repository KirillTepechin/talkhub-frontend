<template>
    <PageHeader v-if="authOrRegisterPage()"></PageHeader>
    <RouterView ></RouterView>
</template>

<script>
 import PageHeader from "@/components/PageHeader";

 export default {
  name: 'App',
  components: {
    PageHeader
  },
  methods:{
    authOrRegisterPage(){
      if(this.$route.path == "/auth" || this.$route.path == "/registration" || this.$route.path=="/"){
        return false
      }
      return true
    }
  }
}
</script>

<style>
  
  body{
    background-color: #242424;
    margin:0;
  }
  #app{
    font-family: 'Krub';
    font-style: normal;
    font-weight: 700;

  }
  a.button {
    
    border-radius:28px;
    display:inline-block;
    cursor:pointer;
    
    font-size: 20px;
    text-decoration:none;
    text-shadow:0px 1px 0px #fdf9ed5c;

    box-shadow: 0px 1px 0px 0px #1c1b18;
    background-color:#FDF9ED;
    border:2px solid #333029;
    display:inline-block;
    cursor:pointer;
    color:black;
    font-weight:bold;
    padding:12px 16px;
    text-decoration:none;
    text-shadow:0px 1px 0px #ffffff;

    text-align: center;

    user-select: none;
  }
  #small{
        padding: 6px 10px;
        font-size: 15px;
  }
  a.button:hover {
	background-color:#ccc2a6;
  }
  a.button:active {
    position:relative;
    top:1px;
  }  

  input[type=text]{
    outline: none;
    border: hidden;
    font-family: 'Krub';
    font-style: normal;
    font-weight: 700;
  }
  input[type=password]{
    outline: none;
    border: hidden;
    font-family: 'Krub';
    font-style: normal;
    font-weight: 700;
  }
  .form-input{
    background-color: #D9D9D9;
    border-radius: 10px;
    width: -webkit-fill-available;
    height: 30px;
    font-size: 25px;
  }
  input[type=file]{
    display: none;
  }
  .custom-file-upload{
    font-family: 'Krub';
    font-style: normal;
    font-weight: 700;

    border-radius:28px;
    display:inline-block;
    cursor:pointer;
    
    font-size: 20px;
    padding:16px 31px;
    text-decoration:none;
    text-shadow:0px 1px 0px #fdf9ed5c;

    box-shadow: 0px 1px 0px 0px #1c1b18;
    background-color:#FDF9ED;
    border:2px solid #333029;
    display:inline-block;
    cursor:pointer;
    color:black;
    font-weight:bold;
    padding:12px 16px;
    text-decoration:none;
    text-shadow:0px 1px 0px #ffffff;

    text-align: center;

    margin: 10px;
}
@keyframes flashing {
  0% {
    border: 2px solid #FDF9ED;

  }
  50% {
    border-color: transparent;
  }
  100% {
    border: 2px solid #FDF9ED;
  }
}

.flashing {
  border: none;
  animation: flashing;
  animation-duration: 2s;
  animation-iteration-count: 3;
}
  .list-complete-item {
    transition: all 1s;
    display: inline-block;
}

.list-complete-enter,
.list-complete-leave-to{
    opacity: 0;
    transform: translateY(30px);
}

.list-complete-leave-active {
    position: absolute;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter-from, .fade-leave-to{
  opacity: 0;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
