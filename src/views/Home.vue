<template>
<div v-if="error"> {{ error }} </div>
  <main v-if="characters.length">
    <div class="searcher">
      <input name="search" id="search" type="text" placeholder="Rick">
      <label for="search">
        <img class="search-icon" src="../assets/images/search.png" alt="Search icon">
      </label>
    </div>
    <div class="cards">
      <Card v-for="character in characters" v-bind:key="character.id" :character="character">
      </Card>
    </div>
    <Paginator @newIdx="fetchData"> </Paginator>
  </main>
<div v-else>Loading...</div>
</template>

<script>
import Card from '../components/Card.vue';
import Paginator from '../components/Paginator.vue';
import getCharacters from '../composables/fetchData.js';

export default {
  name: 'Home',
  components: {Card, Paginator},
  setup(){
    const {characters, error, fetchData} = getCharacters()
    fetchData(1)

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

    return {characters, error, fetchData}
  },
}
</script>

<style scoped>


.searcher {
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  color: green;
  background-color: rgba(255, 255, 255, 0.507);
  width: 40%;
  height: 20px;
  border-radius: 10px;
  border: none;
  border-bottom: 2px solid black;
  font-family: "Shlop", Helvetica, Arial;
  font-size: 25px;
  transition: width ease .5s;
}

label {
  border-radius: 100%;
  background-color: rgba(0, 128, 0, 0.637);
}
.search-icon {
  padding: 3px 5px ;
  width: 25px;
  height: 25px;
}

input:focus{
  width: 60%;
  border-bottom: 2px solid black;
  outline: none;
}

@media (max-width: 600px) {
  input {
    width: 60%;
  }
  input:focus{
    width: 80%;
  }
}

.cards {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

</style>