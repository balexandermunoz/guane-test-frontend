<template>
  <main v-if="characters.length">
    <div class="searcher">
      <input @keydown="enterSearch" v-model="characterName" name="search" id="search" type="text" placeholder="Character name">
      <label for="search" @click="search()">
        <img class="search-icon" src="../assets/images/search.png" alt="Search icon">
      </label>
    </div>
    <div v-if="error" class="error"> {{ error }} </div>
    <div v-else> </div>
    <div class="cards">
      <Card v-for="character in characters" v-bind:key="character.id" :character="character">
      </Card>
    </div>
    <Paginator @newIdx="fetchData"> </Paginator>
  </main>
<div v-else>Loading...</div>
</template>

<script>
import { ref } from '@vue/reactivity';
import Card from '../components/Card.vue';
import Paginator from '../components/Paginator.vue';
import getCharacters from '../composables/fetchCharacters.js';

export default {
  name: 'Home',
  components: {Card, Paginator},
  setup(){
    const {characters, error, fetchData} = getCharacters()
    fetchData(1)

    const characterName = ref('')
    function search(){
      if(characterName.value) fetchData(0,characterName.value)
      error.value = null
    }
    
    function enterSearch(e){
      if(e.key == 'Enter') search()
    }

    return {characters, error, fetchData, search, characterName, enterSearch}
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
  color: black;
  text-align: center;
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

::placeholder {
  color: rgba(0, 0, 0, 0.541);
  text-align: center;
}

.error {
  color: red;
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