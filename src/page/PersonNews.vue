<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { useMovieStore } from '../store/index';

//data
const router = useRouter();
const movieStore = useMovieStore();


//computed
const date = computed(() => {
  if (movieStore.dataNews) {
    const dateArray = movieStore.dataNews.map((item) => {
      return {
        ...item,
        date: new Date(item.publishedAt).toLocaleDateString('ru-RU'),
      }
    });
    console.log('sszz',dateArray)
    return dateArray;
  }
});

//methods
const goBackMaim = () => {
  if (router.options.history.state.back === null) {
    router.push('/');
  } else {
    router.go(-1);
  }
};
const imageLoadOnError = (e) => {
  e.target.src = 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png';
};
</script>

<template>
  <div class="main2">
    <div class="data2">
      <div class="hahe"><el-button @click="goBackMaim"> &lt;- Назад</el-button></div>
    </div>
  </div>
  <div v-if="movieStore.dataNews" class="main">
    <div v-for="item of date" :key="movieStore.dataNews">
      <a target="_blank" class="container2"  :href="item.url">
        <div><img @error="imageLoadOnError" class="image" :src="item.urlToImage" alt="text" /></div>
        <div class="right">
          <div class="head">{{ item.title }}</div>
          <div class="text">{{ item.description }}</div>
          <div class="date">{{ item.date }}</div>
        </div>
      </a>
    </div>
  </div>
  <div  v-if="movieStore.dataNews && movieStore.dataNews.length <= 0" class="err">
    <el-col :sm="12" :lg="6">
      <el-result icon="error" title="У персоны нет новостей" sub-title="Попробуйте позже"> </el-result>
    </el-col>
  </div>
</template>

<style scoped>
.zagr{
  margin-top: 20px;
}
.err{
  display: flex;
  justify-content: center;
}
.main2 {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.data2 {
  width: 1400px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.hahe {
  width: 30%;
  display: flex;
  justify-content: center;
}
.main {
  width: 70%;
  margin: 0 auto;
  margin-top: 20px;
}
.container2 {
  display: grid;
  grid-template-columns: 50% 50%;
  text-decoration: none;
  color: black;
  margin-bottom: 10px;

  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.image {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
.right{
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
}
.head {
  font-size: 17px;
  font-weight: bold;
}
.text {
  font-size: 14px;
  width: 100%;
}
.date{
  font-size: 14px;
  display: flex;
  align-self: end;
}
@media screen and (max-width: 600px) {
  .container2{
    grid-template-columns: 100%;
  }
  .right{
    margin: 10px;
  }
}
</style>
