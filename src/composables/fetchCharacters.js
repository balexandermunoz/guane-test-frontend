const { ref } = require("vue")

const getCharacters = () => {
  const characters = ref([]);
  const error = ref(null);

  async function fetchData(idx=1,name=null){
    let link;
    if(name) link = `https://rickandmortyapi.com/api/character/?name=${name}`;
    else {
      let nChars = []
      for(let i=idx*10-9;i<=idx*10;i++){
        nChars.push(i)
      }
      link = `https://rickandmortyapi.com/api/character/${nChars}`
    }
    try {
      let data = await fetch(link);
      if(!data.ok){
        throw Error('Jesus Morty, this data it not available, you need to try again Morty!')
      }
      characters.value = await data.json();
      if(name) characters.value = characters.value.results
      else characters.value = characters.value;
    }
    catch(err) {
      error.value = err.message;
      console.log(error.value)
    }
  }
  return {characters, error, fetchData}
}

export default getCharacters;