<template>
    <div class="home">
    <div class="header">
      <router-link class="card" :to="{name: 'About'}"> 
      <img class="main-icon" src="./assets/images/menu.png" alt="dropdown menu">
      </router-link>
      <h1>Rick and Morty Fandom</h1>
      <audio hidden="true" ref="audio" loop>
        <source src="./assets/Song.mp3" type="audio/mpeg" allow="autoplay">
      </audio>
      <img class="main-icon" :src="songIcon" alt="" @click="toggleAudio()">
    </div>
  </div>

  <img class="portal-transition" src="./assets/images/Portal.png" alt="portal transition">

  <router-view/>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Home',
  setup(){
    const audio = ref(null);
    let volumeIcon = require("./assets/images/volume.png")
    let muteIcon = require("./assets/images/mute.png")
    let songIcon = ref(volumeIcon)

    function toggleAudio(){
      if(audio.value.paused){
        audio.value.play()
        songIcon.value = volumeIcon
      }
      else{
        audio.value.pause()
        songIcon.value = muteIcon
      }
    }
    return {audio, songIcon, toggleAudio}
  },

  mounted(){
    this.audio.play()
    if(this.audio.paused){
      this.songIcon = require("./assets/images/mute.png")
    }
  },

  watch: {
    $route(to,from){
      let portal = document.querySelector('.portal-transition')
      portal.classList.add('show')
      portal.addEventListener('animationend', () => portal.classList.remove('show') );
    }
  }

}
</script>

<style>

/* Portal transition */

.portal-transition {
  border-radius: 100%;
  position: fixed;
  transform: scale(0);
  top: 50%;
  left: 50%;

  width: 800px;
  height: 800px;
  margin-top: -400px; /* Negative half of height. */
  margin-left: -400px; /* Negative half of width. */
}

@media (max-width:600px) {
  .portal-transition {
    width: 600px;
    height: 600px;
    margin-top: -300px; /* Negative half of height. */
    margin-left: -300px; /* Negative half of width. */
  }
}

.show {
  animation: myKey 1s cubic-bezier(0, 0.55, 0.45, 1);
}

@keyframes myKey {
  0%{
    transform: scale(0);
  }
  50%{
    transform: scale(1.5) rotate(90deg);
  }
  100%{
    transform: scale(0) rotate(180deg);
  }
}

/* End of portal transition */

@font-face {
  font-family: "Schwifty";
  src: local("Schwifty"),
   url(assets/fonts/get_schwifty.ttf) format("truetype");
}

@font-face {
  font-family: "Misfits";
  src: local("Misfits"),
   url(assets/fonts/MISFITS_.TTF) format("truetype");
}

@font-face {
  font-family: "Shlop";
  src: local("Shlop"),
   url(assets/fonts/shlop\ rg.ttf) format("truetype");
}

html{
   scroll-behavior: smooth;
}

@media (max-width:650px) {
  body {
    background-image: url("./assets/images/background2.jpg");
    /* background-size: cover; */
    background-color: #cccccc;
  }
}

@media (min-width:650px) {
  body {
    background-image: url("./assets/images/background1.jpg");
    background-color: #cccccc;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Header */

.header{
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.main-icon {
  background-color: #42b98396;
  border-radius: 50px;
  padding: 10px;
}

.main-icon:hover {
  cursor: pointer;
  background-color: #42b983e0;
}

h1 {
  -webkit-text-stroke: 1px #42b983; /* !! */
  color: #000000;
  font-size: 80px;
  font-family: "Shlop", Helvetica, Arial;
  margin: 0;
}
/* End Header */

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
