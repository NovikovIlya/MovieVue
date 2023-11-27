<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { ref } from 'vue';
import { useMovieStore } from './store';

const movieStore = useMovieStore()

const show = ref(false)



const modal = ()=>{
  // show.value = true
  console.log('был клик у папы')
  movieStore.setShowModalTrue()
}
</script>

<template >
  <div @click="modal">
    <NavBar :modal="show"/>
    <RouterView />
  </div>
 

</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
