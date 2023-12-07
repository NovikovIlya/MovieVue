<script setup lang="ts">
import { computed, ref } from 'vue';

let cartItems = ref(JSON.parse(localStorage.getItem('persons')) || []);

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
  <div style="width: 100%">
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
.infinite-list {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  list-style-type: none;
}
.photo {
  width: 100%;
  height: 480px;
}
.personContainer {
  text-decoration: none;
}
.infinite-list-item {
  border-radius: 20px;
  margin: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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
