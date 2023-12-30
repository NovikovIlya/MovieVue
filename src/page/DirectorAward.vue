<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { DataPersonType } from '../types';
import cachedAxios from '../axios.js';
import { useMovieStore } from '../store/index';
import { storeToRefs } from 'pinia';

// Component data and logic
const movieStore = useMovieStore();
const page = ref(0);
const dataPerson = ref<DataPersonType[]>([]);
const isLoading = ref(false);
const isError = ref(false);


// Lifecycle hooks
onMounted(() => {
  load();
});

//composables
const {valueSort, valueSortType, valueSortProffession} = storeToRefs(movieStore);

// Component methods
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

// Watchers
watch(valueSort, (_) => {
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
      <h4 class="header">Роль:</h4>
      <el-select v-model="movieStore.valueSortProffession" class="m-2" placeholder="Select" size="large">
        <el-option
          v-for="item in movieStore.options2"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </div>
    <div class="mainSort__right">
      <h4 class="header">Сортировать:</h4>
      <el-select v-model="movieStore.valueSort" class="m-2 mr" placeholder="Select" size="large">
        <el-option
          v-for="item in movieStore.options"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
      <el-select v-model="movieStore.valueSortType" class="m-2" placeholder="Select" size="large">
        <el-option
          v-for="item in movieStore.options3"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </div>
  </div>

  <div class="ww" style="width: 100%" v-loading="isLoading">
    <ul v-infinite-scroll="load" class="infinite-list" infinite-scroll-immediate="false">
      <TransitionGroup name="list">
        <li v-for="(person, index) in dataPerson" :key="person.id" class="infinite-list-item">
          <RouterLink :to="{name: 'PersonPage', params: {id: person.id}}" class="personContainer">
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
              <div class="infoText">
                <div class="name__info">Возраст: {{ person.age }}</div>
                <div class="name__info">Пол: {{ person.sex }}</div>
              </div>
              <div class="ind">{{ index + 1 }}</div>
            </div>
          </RouterLink>
        </li>
      </TransitionGroup>
    </ul>
    <div class="err" v-if="isError">
      <el-col :sm="12" :lg="6">
        <el-result icon="error" title="Произошла ошибка" sub-title="Попробуйте пожалуйста позднее">
        </el-result>
      </el-col>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mr {
  margin-right: 5px;
}
.el-loading-spinner {
  margin-top: 0;
}
.ww {
  margin-top: 10px;
}
.container {
  padding-left: 5%;
  padding-right: 5%;
}
.name__text {
  font-weight: 700;
}
.ind {
  width: 100%;
  display: flex;
  justify-content: end;
  font-size: 15px;
  margin-right: 11px;
  opacity: 0.5;
}
.infinite-list {
  height: 99%;
  padding-left: 3%;
  padding-right: 3%;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-color-primary);
  margin-bottom: 40px;
  border-radius: 20px;
  // padding: 0;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.infinite-list {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}

.photo {
  border-radius: 20px 20px 0 0;
  width: 100%;
  height: 45vh;
}
.personContainer {
  border-radius: 20px;
  width: 70%;
  text-decoration: none;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 100%;
  border: 2px solid transparent;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
}
.personContainer:hover{
  scale:1.03;
  transition: 0.3s;
  
}
.infoText {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.name {
  margin-top: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &__text {
    margin-bottom: 5px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  &__info {
    margin-bottom: 5px;
    font-size: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
}

.example-showcase .el-loading-mask {
  z-index: 9;
}

.err {
  display: flex;
  justify-content: center;
}
.mainSort {
  display: flex;
  padding-left: 6%;
  padding-right: 6%;
  justify-content: space-between;
  &__left {
    display: flex;
    align-items: baseline;
  }
  &__right {
    display: flex;
    align-items: baseline;
  }
}
.header {
  margin-right: 10px;
  // margin-left: 5px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media screen and (max-width: 600px) {
  .infinite-list {
    grid-template-columns: 100%;
  }
  .mainSort {
    flex-wrap: wrap;
  }
  .err {
    margin-top: 10px;
  }
}
</style>
