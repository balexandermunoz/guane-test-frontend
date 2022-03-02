<template>
  <router-link class="card" :to="{name: 'Details', params: {id: character.id}}"> 
    <h3>{{character.name}}</h3>
    <img :src="character.image" alt="">
    <table>
      <tr> <th>Specie:</th><td>{{character.species}}</td> </tr>
      <tr> <th>Gender:</th><td>{{character.gender}}</td> </tr>
      <tr> <th>Status:</th><td>{{character.status}}</td> </tr>
    </table>
  </router-link>
</template>

<script>
export default {
  props: ['character']
}
</script>

<style scoped>

.card {
  text-decoration: none;
  color: black;
  width: 250px;
  height: 300px;
  margin: 10px;
  background-color: rgba(0, 128, 0, 0.856);
  border-radius: 10px;
  transition: background-color .5s ease-in-out, transform .7s ease;
}

.card:hover {
  background-color: rgba(0, 128, 0, 0.973);
  transform: scale(1.2) rotate(8deg);
  cursor: pointer;
}

h3 {
  font-family: "Schwifty", Helvetica, Arial;
  /* font-family: "Shlop", Helvetica, Arial; */
}

img {
  width: 120px;
  border: 2px solid black;
  border-radius: 50%;
}

table{
  font-family: "Schwifty", Helvetica, Arial;
  width: 100%;
  text-align: left;
  border-collapse: separate;
  border-spacing: 5px 0;
}

th{
  padding: 0 10px;
}
</style>