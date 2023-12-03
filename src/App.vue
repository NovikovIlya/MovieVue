<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { ref } from 'vue';
import { useMovieStore } from './store';
import { useRoute } from 'vue-router';

const movieStore = useMovieStore()

const show = ref(false)
const route = useRoute()


const modal = ()=>{
  console.log('был клик у папы')
  movieStore.setShowModalTrue()
}
</script>


<template >
  <div class="hh" @click="modal">
    <NavBar :modal="show"/>
    <RouterView :key="route.fullPath"></RouterView>
  </div>
 

</template>


<style >
.fix{
  overflow: hidden;
}
</style>
