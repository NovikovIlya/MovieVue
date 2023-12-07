<script setup lang="ts">
import { computed } from 'vue';

const deleteFavorite = (person) => {
  const text = localStorage.getItem('persons') !== null ? localStorage.getItem('persons') : [];
  if (text) {
    //@ts-ignore
    const localstorage = JSON.parse(text);
    const ls = localstorage.filter((item) => {
      console.log('ii', item.id, person.id);
      return item.id != person.id;
    });
    console.log('ls', ls);
    if (ls) {
      localStorage.setItem('persons', JSON.stringify(ls));
    } else {
      alert('Что-то пошло не так');
    }
  }
};

const arraLocal = computed(() => {
  const text = localStorage.getItem('persons');
  if (text) {
    const localstorage = JSON.parse(text);
    return localstorage;
  } else {
    return [];
  }
});


</script>

<template>
  <div style="width: 100%">
    <ul class="infinite-list" infinite-scroll-immediate="false">
      <li v-for="person of arraLocal" :key="person.id" class="infinite-list-item">
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
        <el-button class="elll" @click="deleteFavorite(person)">Удалить</el-button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.infinite-list {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  list-style-type:none;
}
.photo {
  width: 300px;
  height: 400px;
}
.personContainer {
  text-decoration: none;
}

@media screen and (max-width: 600px) {
  .infinite-list{
    margin-bottom: 20px;
    grid-template-columns: 100%;
  }
  .infinite-list-item{
    margin-bottom: 20px;
  }
  .elll{
    width: 90%;
    margin: 0 auto;
  }
}
</style>
