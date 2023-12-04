<script setup lang="ts">
import { onMounted } from 'vue';

const persons = JSON.parse(localStorage.getItem('persons'))

onMounted(()=>{
    if(persons){
        console.log('persons',persons)
    }
})
</script>

<template>
  <div style="width: 100%" >
    <ul  class="infinite-list" infinite-scroll-immediate="false">
      <li v-for="person of persons" :key="person.id" class="infinite-list-item">
        <RouterLink :to="'/person/' + person.id" class="personContainer">
          <img
           
            class="photo"
            :src="
              person.photo
                ? person.photo
                : 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png'
            " />
          <div class="name">
            <div class="name__text">{{ person.name ? person.name : person.enName }}</div>
            <div>
              <div class="name__info">Возраст: {{ person.age }}</div>
              <div class="name__info">Пол: {{ person.sex }}</div>
            </div>
          </div>
        </RouterLink>
      </li>
    </ul>
  
  </div>
</template>



<style scoped>
.infinite-list{
  display: grid;
  grid-template-columns: 33% 33% 33%;
}
.photo{
  width: 300px;
  height:400px;
}
.personContainer{
  text-decoration: none;
}
</style>