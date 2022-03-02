const { ref } = require("vue")

const getCharacters = () => {
  const characters = ref([]);
  const error = ref(null);

  async function fetchData(idx){
    let nChars = []
    for(let i=idx*10-9;i<=idx*10;i++){
      nChars.push(i)
    }
    let link = `https://rickandmortyapi.com/api/character/${nChars}`
    try {
      let data = await fetch(link);
      if(!data.ok){
        throw Error('Jesus Morty, the data it not available, you need to refresh the page Morty!')
      }
      characters.value = await data.json();
      characters.value = characters.value;
    }
    catch(err) {
      error.value = err.message;
      console.log(error.value)
    }
  }
  return {characters, error, fetchData}
}

export default getCharacters;