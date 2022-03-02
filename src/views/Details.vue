<template>
<div v-if="character" class="container">
  <div class="col1">
    <h1>{{character.name}}</h1>
    <img class="character-img" :src="character.image" />
    <table class="t1">
      <tr> <th>Status:</th><td>{{character.status}}</td> </tr>
      <tr> <th>Specie:</th><td>{{character.species}}</td> </tr>
      <tr> <th>Gender:</th><td>{{character.gender}}</td> </tr>
      <tr v-if="location"> <th>Origin:</th><td>{{character.origin.name}}</td> </tr>
      <tr v-else> <th>Origin:</th><td>Unknown</td> </tr>
    </table>
  </div>
  
  <div class="col2">
    <button @click="goBack">❮ Back</button>
    <p> Known as {{character.name}}.</p>

    <p v-if="character.status == 'Alive'"> This {{character.species}} is still alive.</p>
    <p v-else-if="character.status == 'Dead'"> This {{character.species}} is fuckin dead. </p>
    <p v-else> No one knows if this {{character.species}} is still alive or already dead. </p>

    <p v-if="character.location">Currently located in {{character.location.name}}.</p>

    <p v-if="location"> born in  {{location.type}} {{location.name}} in the dimension "{{location.dimension}}". In this place are {{location.residents.length}} characters.</p>
    <p v-else> It's not known where this {{character.species}} is from. </p>
    <table class="t2">
      <tr>
        <th class="col2-th">Episode</th>
        <th class="col2-th">Name</th>
        <th class="col2-th">Relase data</th>
        <th class="col2-th">Available on</th>
      </tr>
      <tr v-for="epi in episodes" :key="epi.id">
        <td>{{epi.episode}}</td>
        <td>{{epi.name}}</td>
        <td>{{epi.air_date}}</td>
        <td> <a href="https://www.netflix.com/co/title/80014749#:~:text=Rick%20y%20Morty%20%7C%20Netflix"> <img class="icon" src="../assets/images/netflix.png" alt="netflix logo"> </a></td>
      </tr>
    </table>
  </div>
</div>
<div v-else> Loading...</div>
</template>

<script>
import { ref } from '@vue/reactivity';
import getCharacter from '../composables/fecthCharacter';
import getAllData from '../composables/fetchAll';

export default {
  props: ['id'],
  setup(props){
    
    const {character,location, episodes, error, fetchData} = getAllData()
    fetchData(props.id)

    return {character, location, episodes, error}
  },

  methods:{
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

*{
  color: rgba(255, 255, 255, 0.911);
}

.container{
  display: flex;
  justify-content: space-around;
}
.col1, .col2{
  display: flex;
  flex-direction: column;
}

.col1{
  align-items: center;
}

h1 {
  margin: 0;
  padding: 0;
  font-family: "Shlop", Helvetica, Arial;
  font-size: 40px;
}

button {
  background-color: rgba(0, 128, 0, 0.521);
  height: 40px;
  margin: 0 10px;
  padding: 10px;
  border: none;
  border-radius: 4px;
}

button:hover{
  cursor: pointer;
}

table.t1{
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  text-align: start;
  font-family: "Shlop", Helvetica, Arial;
  font-size: 20px;
}

table.t2 {
  font-family: "Shlop", Helvetica, Arial;
  margin-top: 30px;
}

.col2-th{
  font-family: "Schwifty", Helvetica, Arial; 
}

th, td {
  padding: 3px 8px;
}

img.character-img {
    float: left;
    margin: 0 20px 20px 0;
    outline: 5px solid green;
    border-radius: 10px;
    opacity: 1;
}

img.icon:hover {
  opacity: 0.5;
}

p {
    font-family: "Shlop", Helvetica, Arial;
    text-align: justify;
    padding: 0;
    margin: 5px 0;
    text-indent: 1em;
}

@media (max-width:650px) {
  .container{
    flex-direction: column;
  }
  img.character-img {
    width: 300px;
    height: 300px;
  }
}

@media (max-width:400px) {
  img.character-img {
    width: 250px;
    height: 250px;
  }
  img.icon {
    width: 20px;
    height: 20px;
  }
  .t2{
    font-size: 12px;
  }
}
</style>