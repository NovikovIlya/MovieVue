<script setup lang="ts">
import {  ref } from 'vue';

//data
const cartItems = ref(JSON.parse(localStorage.getItem('persons')) || []);

//methods
const deleteFavorite = (person) => {
  const text = localStorage.getItem('persons') !== null ? localStorage.getItem('persons') : [];
  if (text) {
    //@ts-ignore
    const localstorage = JSON.parse(text);
    const ls = localstorage.filter((item) => {
      return item.id != person.id;
    });
    if (ls) {
      let kls = Array.from(new Set(ls));
      localStorage.setItem('persons', JSON.stringify(kls));
      cartItems.value = kls;
    } else {
      alert('Что-то пошло не так');
    }
  }
};
</script>

<template>
  <div class="container2" >
    <ul class="infinite-list" infinite-scroll-immediate="false">
      <TransitionGroup  name="list"  >
        <li v-for="person of cartItems" :key="person.id" class="infinite-list-item">
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
      </TransitionGroup>
    </ul>
  </div>
</template>

<style scoped>
.name__info{
  font-size: 10px;
}
.container2{
  padding-left: 5%;
  padding-right: 5%;
}
.infinite-list {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  list-style-type: none;
  padding-left: 0;
}
.photo {
  width: 100%;
  height: 45vh;
  border-radius: 20px 20px 0 0 ;
}
.personContainer {
  text-decoration: none;
  border: 2px transparent solid;
}
.infinite-list-item:hover{
  scale:1.03;
  transition: 0.3s;
}
.infinite-list-item {
  border-radius: 20px;
  margin: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 56%;
  display: flex ;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.name {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.name__text {
  font-weight: 700;
  margin-bottom: 10px;
  width: 100%;
  justify-content: center;
  display: flex;
  font-size: 18px;
}
.elll {
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  border-radius: 0 0 20px 20px;
}


.list-enter-active,
.list-leave-active {
  transition: all 1.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media screen and (max-width: 600px) {
  .infinite-list {
    margin-bottom: 20px;
    grid-template-columns: 100%;
    padding: 0;
  }
  .infinite-list-item {
    margin-bottom: 20px;
    width: 94%;
  }
  .elll {
    padding-top: 10px;
    width: 100%;
    margin: 0 auto;
  }
  .name {
    margin-bottom: 10px;
  }
}
</style>
