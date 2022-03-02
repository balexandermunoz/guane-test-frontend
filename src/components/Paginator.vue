<template>
  <div class="pagination">
    <a href="#" @click="prevPage">&laquo;</a>
    <a href="#" v-for="i in 5" :key="i" :class="{ 'active': activeIdx == i }" @click="changePage(i)"> <b>{{i}}</b> </a>
    <a href="#" @click="nextPage">&raquo;</a>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {

  setup(props, { emit }){
    const minPage = 1;
    const maxPage = 5;
    const activeIdx = ref(1);

    window.addEventListener('keydown', (e) => {
      if(e.key == 'ArrowRight') nextPage()
      if(e.key == 'ArrowLeft') prevPage()
      })

    function changePage(i){
      activeIdx.value = i
      emit('newIdx', activeIdx.value)
    }

    function nextPage(){
      if(activeIdx.value === maxPage) activeIdx.value = 1;
      else activeIdx.value += 1;
      changePage(activeIdx.value)
    }

    function prevPage(){
      if(activeIdx.value === minPage) activeIdx.value = maxPage;
      else activeIdx.value -= 1;
      changePage(activeIdx.value)
    }
    
    return {activeIdx, changePage, nextPage, prevPage}
  },
}
</script>

<style scoped>

.pagination {
  background-color:  #4caf4fa9;
  border-radius: 10px;
  display: inline-block;
  margin: 10px 0 5px 0;
}

.pagination a {
  font-size: 20px;
  color: black;
  border-radius: 10px;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
}

.pagination a:hover:not(.active) {background-color: #ddd;}

</style>