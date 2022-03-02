const { ref } = require("vue")

const getCharacter = () => {
  const character = ref([]);
  const error = ref(null);

  async function fetchData(idx){
    console.log(idx)
    let link = `https://rickandmortyapi.com/api/character/${idx}`
    try {
      let data = await fetch(link);
      if(!data.ok){
        throw Error('Jesus Morty, the data it not available, you need to refresh the page Morty!')
      }
      character.value = await data.json();
      character.value = character.value;
    }
    catch(err) {
      error.value = err.message;
      console.log(error.value)
    }
  }
  return {character, error, fetchData}
}

export default getCharacter;