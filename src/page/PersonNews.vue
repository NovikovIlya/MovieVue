<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';

//data
const {
  params: { name },
} = useRoute();
const router = useRouter();

//composables
const getNews = async (name) => {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${name}&apiKey=35de744977574bf3885d9c13ed179bc7`,
  );
  const { articles } = await res.json();
  return articles;
};
const {
  data,
  refetch,
  isLoading: isLoad,
  isError: isEr,
  error,
} = useQuery<any, Error>({
  queryKey: ['news', name],
  queryFn: () => getNews(name),
  retry: false,
  // enabled: false,
  refetchOnWindowFocus: false,
});

//computed
const date = computed(() => {
  if (data.value) {
    console.log('data',data)

    const dateArray = data.value.map((item) => {
      return {
        ...item,
        date: new Date(item.publishedAt).toLocaleDateString('ru-RU'),
      }
    });
    console.log('dateArray',dateArray)
    return dateArray;
  }
});

//methods
const goBackMaim = () => {
  console.log('router', router);
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
  <div class="main">
    <div v-for="item of date" :key="data">
      <a target="_blank" class="container2" v-if="data" :href="item.url">
        <div><img @error="imageLoadOnError" class="image" :src="item.urlToImage" alt="text" /></div>
        <div>
          <div class="head">{{ item.title }}</div>
          <div class="text">{{ item.description }}</div>
          <div>{{ item.date }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
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
}
.main {
  width: 70%;
  margin: 0 auto;
}
.container2 {
  display: grid;
  grid-template-columns: 50% 50%;
  text-decoration: none;
  color: black;
}
.image {
  width: 100%;
}
.head {
  font-size: 15px;
}
.text {
  font-size: 12px;
}
</style>
