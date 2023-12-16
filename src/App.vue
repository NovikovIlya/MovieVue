<script setup lang="ts">
import { ref } from 'vue';
import { useMovieStore } from './store';
import { useRoute } from 'vue-router';

import NavBar from './components/NavBar.vue';

const route = useRoute()
const movieStore = useMovieStore()

const show = ref(false)

const modal = ()=>{
  movieStore.setShowModalTrue()
}
</script>


<template >
  <div class="hh" @click="modal">
    <NavBar :modal="show"/>
    <RouterView :key="route.fullPath" />
  </div>
</template>


<style >
.fix{
  overflow: hidden;
}
.hh{
  min-height: 100vh;
}
</style>
