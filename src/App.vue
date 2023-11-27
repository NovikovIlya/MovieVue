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
  <div class="hh" @click="modal">
    <NavBar :modal="show"/>
    <RouterView />
  </div>
 

</template>


<style scoped>
.hh{
  height: 100vh;
}
</style>
