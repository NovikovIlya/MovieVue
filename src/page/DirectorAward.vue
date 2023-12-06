<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { DataPersonType } from '../types';
import Axios from 'axios';
// import { setupCache } from 'axios-cache-interceptor';

// const axios = setupCache(Axios); 
import cachedAxios from '../axios.js'

const valueSort = ref('countAwards');
const valueSortType = ref('-1');
const valueSortProffession = ref('Режиссер');
const page = ref(0);
const dataPerson = ref<DataPersonType[]>([]);
const isLoading = ref(false);
const isError = ref(false);

const options = [
  {
    value: 'countAwards',
    label: 'По наградам',
  },
  {
    value: 'age',
    label: 'По возрасту',
  },
  {
    value: 'movies.rating',
    label: 'По рейтингу фильма',
  },
];
const options2 = [
  {
    value: 'Режиссер',
    label: 'Режиссер',
  },
  {
    value: 'Актер',
    label: 'Актер',
  },
  {
    value: 'Актер дубляжа',
    label: 'Актер дубляжа',
  },
  {
    value: 'Актриса',
    label: 'Актриса',
  },
  {
    value: 'Актриса дубляжа',
    label: 'Актриса дубляжа',
  },
  {
    value: 'Звукорежиссер',
    label: 'Звукорежиссер',
  },
  {
    value: 'Композитор',
    label: 'Композитор',
  },
  {
    value: 'Монтажер',
    label: 'Монтажер',
  },
  {
    value: 'Озвучка',
    label: 'Озвучка',
  },
  {
    value: 'Оператор',
    label: 'Оператор',
  },
  {
    value: 'Переводчик',
    label: 'Переводчик',
  },
  {
    value: 'Сценарист',
    label: 'Сценарист',
  },
  {
    value: 'Художник',
    label: 'Художник',
  },
];
const options3 = [
  {
    value: '-1',
    label: 'По убыванию',
  },
  {
    value: '1',
    label: 'По возрастанию',
  },
];

const load = () => {
  if (page.value === 35651) {
    alert('Последний страница');
    return;
  }
  page.value++;
  getPerson(page);
};

const getPerson = async (page) => {
  try {
    isError.value = false;
    isLoading.value = true;
    const res = await cachedAxios.get(
      `https://api.kinopoisk.dev/v1.4/person?profession.value=${valueSortProffession.value}&sortType=${valueSortType.value}&limit=20&sortField=${valueSort.value}&page=${page.value}`,
      {
        headers: {
          'X-API-KEY': '1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8',
        },
      },
    );
    // const data = await res.json();
    //@ts-ignore
    const dataZ = res.data.docs;
    if (!dataZ) {
      throw new Error('Произошла ошибка');
    }
    dataPerson.value = [...dataPerson.value, ...dataZ];
    isError.value = false;
  } catch (error) {
    console.log(error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};
const imageLoadOnError = (e) => {
  e.target.src = 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png';
};

//   queryKey: ['todos', page],
//   queryFn: () => getPerson(page),
//   retry: false,
//   // enabled: false,
//   refetchOnWindowFocus: false,
// });

onMounted(() => {
  load();
});
watch(valueSort, (_) => {
  console.log('valueSort', valueSort);
  dataPerson.value = [];
  page.value = 1;
  getPerson(page);
});
watch(valueSortProffession, () => {
  dataPerson.value = [];
  page.value = 1;
  getPerson(page);
});
watch(valueSortType, () => {
  dataPerson.value = [];
  page.value = 1;
  getPerson(page);
});
</script>

<template>
  <div class="mainSort">
    <div class="mainSort__left">
      <h4 class="header">Роль: </h4>
      <el-select v-model="valueSortProffession" class="m-2" placeholder="Select" size="large">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </div>
    <div class="mainSort__right">
      <h4 class="header">Сортировать:</h4>
      <el-select v-model="valueSort" class="m-2" placeholder="Select" size="large">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>

      <el-select v-model="valueSortType" class="m-2" placeholder="Select" size="large">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </div>
  </div>

  <div style="width: 100%" v-loading="isLoading">
    <ul v-infinite-scroll="load" class="infinite-list" infinite-scroll-immediate="false">
      <li v-for="person of dataPerson" :key="person.id" class="infinite-list-item">
        <RouterLink :to="'/person/' + person.id" class="personContainer">
          <img
            @error="imageLoadOnError"
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
    <div class="err" v-if="isError">
      <el-col :sm="12" :lg="6">
        <el-result icon="error" title="Произошла ошибка" sub-title="Попробуйте позже"> </el-result>
      </el-col>
    </div>
  </div>
</template>

<style scoped lang="scss">
.infinite-list {
  height: 99%;
  padding: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-color-primary);
  padding: 0;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.photo {
  width: 70px;
  height: 90px;
}
.personContainer {
  text-decoration: none;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 88px 150px;
  border: 2px solid transparent;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
}
.name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &__text {
    font-size: 18px;

    width: 100%;
  }
  &__info {
    margin-bottom: 5px;
    font-size: 10px;
  }
}

.example-showcase .el-loading-mask {
  z-index: 9;
}

.err {
  display: flex;
  justify-content: center;
}
.mainSort{
  display: flex;
  justify-content: space-between;
  &__left{
    display: flex;
    align-items: baseline;
  }
  &__right{
    display: flex;
    align-items: baseline;
  }
}
.header{
  margin-right: 10px;
}
</style>
