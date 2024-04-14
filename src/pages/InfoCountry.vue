<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { ref, computed } from 'vue';
import { useValidName } from '../composable/useValidName';

//data
const {
  params: { name },
} = useRoute();
const router = useRouter();

//methods
const imageLoadOnError = (e) => {
  e.target.src = 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png';
};
const goBackMaim = () => {
  if (router.options.history.state.back === null) {
    router.push('/');
  } else {
    router.go(-1);
  }
};

//composable
const {nameEng} = useValidName(name)

const getCountry = async (name) => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${nameEng.value}`);
  const data = await res.json();
  const dataZ = data;
  return dataZ;
};
const {
  data: data2,
  refetch: refetch2,
  isLoading: isLoad2,
  isError: isEr2,
  error: error2,
} = useQuery<any, Error>({
  queryKey: ['country', name],
  queryFn: () => getCountry(name),
  retry: false,
  refetchOnWindowFocus: false,
});

const getCountryPersons = async (name) => {
  name === 'Соединённые Штаты Америки' ? name = 'США' : name;
  const res = await fetch(
    `https://api.kinopoisk.dev/v1.4/person?birthPlace.value=${name}&notNullFields=name&notNullFields=photo&notNullFields=age&notNullFields=enName&sortField=countAwards&sortType=-1&limit=100`,
    {
      headers: {
        'X-API-KEY': '1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8',
      },
    },
  );
  const data = await res.json();
  const dataZ = data.docs;
  return dataZ;
};
const {
  data: dataPerson,
  refetch: refetchPerson,
  isLoading: isLoadPerson,
  isError: isErPerson,
  error: errorPerson,
} = useQuery<any, Error>({
  queryKey: ['person', name],
  queryFn: () => getCountryPersons(name),
  retry: false,
  refetchOnWindowFocus: false,
});

//computed
const population = computed(() => {
  if (data2.value) {
    const x = data2.value?.map((item) => {
      return { ...item, popul: new Intl.NumberFormat('ru-RU').format(item.population) };
    });
    return x 
  }
});
</script>

<template>
  <div class="main2">
    <div class="data2">
      <div class="hahe">
        <el-button @click="goBackMaim"> &lt;- Назад</el-button>
      </div>
    </div>
  </div>

  <div v-if="data2" class="containerMain">
    <div v-for="item of population">
      <div class="ImageMain"><img class="image" :src="item?.flags?.png" alt="flag" /></div>
      <el-divider class="dvid" />
      <div class="text">{{ item?.translations?.rus?.official }}</div>
      <el-divider class="dvid" />
      <div class="population">Численность: {{ item.popul }} человек</div>
      <el-divider class="dvid" />
      <div class="hre"><a :href="item?.maps?.googleMaps">Открыть в google map</a></div>
      <el-divider class="dvid" />
    </div>
  </div>
  <div class="error" style="width: 100%" v-loading="isLoad2" v-if="isLoad2"></div>
  <div v-if="isEr2" class="error">
    <el-col :sm="12" :lg="6">
      <el-result icon="error" title="Произошла ошибка" sub-title="Попробуйте позже"> </el-result>
    </el-col>
  </div>

  <div v-if="dataPerson" class="div"><h2 class="hh5">Известные люди:</h2></div>
  <div v-if="dataPerson" class="containerMain2">
    <ul class="infinite-list" infinite-scroll-immediate="false">
      <li v-for="(item, index) in dataPerson" :key="item.id">
        <RouterLink :to="{ name: 'PersonPage', params: { id: item.id } }" class="personContainer">
          <img
            @error="imageLoadOnError"
            class="photo"
            :src="
              item.photo
                ? item.photo
                : 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png'
            " />
          <div class="name">
            <div class="name__text">{{ item.name ? item.name : item.enName }}</div>
            <div class="infoText">
              <div class="name__info">Возраст: {{ item.age }}</div>
              <div class="name__info">Пол: {{ item.sex }}</div>
            </div>
            <div class="ind">{{ index + 1 }}</div>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
  <div class="error" style="width: 100%" v-loading="isLoadPerson" v-if="isLoadPerson"></div>
  <div v-if="isErPerson">
    <el-col :sm="12" :lg="6">
      <el-result icon="error" title="Произошла ошибка" sub-title="Попробуйте позже"> </el-result>
    </el-col>
  </div>
</template>

<style scoped lang="scss">
.error {
  margin-top: 50px;
}
.hh5 {
  margin-bottom: 5px;
}
.div {
  display: flex;
  justify-content: center;
}
.hahe {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.dvid {
  margin-top: 20px;
}

.containerMain {
  width: 70%;
  margin: 0 auto;
  margin-top: 40px;
}
.containerMain2 {
  width: 70%;
  margin: 0 auto;
  margin-top: 10px;
}
.text {
  margin-top: 10px;
  text-align: center;
}
.population {
  text-align: center;
}
.ImageMain {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.image {
  width: 50%;
}
.capital {
  text-align: center;
}
.hre {
  text-align: center;
}

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
  text-align: center;
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
  margin: 10px;
  border-radius: 20px;
  // width: 70%;
  text-decoration: none;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 100%;
  border: 2px solid transparent;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
}
.personContainer:hover {
  scale: 1.03;
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
