<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuery, useInfiniteQuery } from '@tanstack/vue-query';
import { RouterLink } from 'vue-router';

export type DataPersonType = {
  id: number;
  name: string;
  enName: string;
  photo: string;
  age: number;
  sex: string;
};

const page = ref(0);
const dataPerson = ref<DataPersonType[]>([]);
const isLoading = ref(false);
const isError = ref(false);

const load = () => {
  if (page.value === 35651) {
    alert('Последний страница');
    return;
  }
  page.value++;
  getPerson(page);
  console.log('след страница');
};

const getPerson = async (page) => {
  try {
    isError.value = false;
    isLoading.value = true;
    const res = await fetch(
      `https://api.kinopoisk.dev/v1.4/person?profession.value=Режиссер&sortType=-1&limit=20&sortField=countAwards&page=${page.value}`,
      {
        headers: {
          'X-API-KEY': '1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8',
        },
      },
    );
    const data = await res.json();
    const dataZ = data.docs;
    if (!dataZ) {
      throw new Error('Произошла ошибка');
    }
    dataPerson.value = [...dataPerson.value, ...dataZ];
    isError.value = false;
    // return dataZ;
  } catch (error) {
    console.log(error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

// const { data, refetch, isLoading,isError } = useInfiniteQuery<any, any>({
//   queryKey: ['todos', page],
//   queryFn: () => getPerson(page),
//   retry: false,
//   // enabled: false,
//   refetchOnWindowFocus: false,
// });

onMounted(() => {
  load();
});
</script>

<template>
  <div style="width: 100%" v-loading="isLoading">
    <ul v-infinite-scroll="load" class="infinite-list" infinite-scroll-immediate="false">
      <li v-for="person of dataPerson" :key="person.id" class="infinite-list-item">
        <RouterLink to="" class="personContainer">
          <img class="photo" :src="person.photo" />
          <div class="name">{{ person.name }}</div>
        </RouterLink>
      </li>
    </ul>
    <!-- <div v-if="isLoading">Загрузка...</div> -->
    <div v-if="isError">Произошла ошибка</div>
  </div>
</template>

<style scoped>
.infinite-list {
  /* height: 90vh; */
  height: 99%;
  padding: 0;
  /* margin: 0; */
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 50px; */
  /* background: var(--el-color-primary-light-9); */
  /* margin: 10px; */
  color: var(--el-color-primary);
  padding: 0;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.photo {
  width: 60px;
}
.personContainer {
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 88px 150px;
  border: 2px solid transparent;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
}
.name {
  display: flex;
  align-items: center;
}

.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
