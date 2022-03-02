const { ref } = require("vue")

const getAllData = () => {
  const character = ref([]);
  const location = ref(null);
  const episodes = ref(null)
  const error = ref(null);

  async function fetchData(idx=1){
    let link = `https://rickandmortyapi.com/api/character/${idx}`
    try {
      let data = await fetch(link);
      if(!data.ok){
        throw Error('Jesus Morty, the data it not available, you need to refresh the page Morty!')
      }
      character.value = await data.json();
      character.value = character.value;
      //console.log('character: ',character)

      if(character.value.origin.url) fetchLocationData(character.value.origin.url)

      if(character.value.episode){
        //console.log('episodes lenght: ', character.value.episode.length)
        let episodesIdx = [];
        character.value.episode.forEach((val,idx) => episodesIdx.push(val.match(/\d+$/)[0]))
        fetchEpisodesData(episodesIdx)
      }
    }
    catch(err) {
      error.value = err.message;
      console.log(error.value)
    }
  }

  async function fetchLocationData(link){
    try {
      let data = await fetch(link);
      if(!data.ok){
        throw Error('Jesus Morty, the data it not available, you need to refresh the page Morty!')
      }
      location.value = await data.json();
      location.value = location.value;
      //console.log('location:',location)
    }
    catch(err) {
      error.value = err.message;
      console.log(error.value)
    }
  }

  async function fetchEpisodesData(arr){
    let link = `https://rickandmortyapi.com/api/episode/${arr}`
    try {
      let data = await fetch(link);
      if(!data.ok){
        throw Error('Jesus Morty, the data it not available, you need to refresh the page Morty!')
      }
      episodes.value = await data.json();
      if(character.value.episode.length <= 1) episodes.value = [episodes.value];
    }
    catch(err) {
      error.value = err.message;
      console.log(error.value)
    }
  }
  return {character, location, episodes, error, fetchData}
}

export default getAllData;