<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useMovieStore } from '../store/index';
import { useQuery } from '@tanstack/vue-query';
import { onMounted, computed, ref, watch } from 'vue';
import { PersonInfo } from '../types/index.js';

const movieStore = useMovieStore();
const {
  params: { id },
} = useRoute();

const getPerson = async (id) => {
  const res = await fetch(`https://api.kinopoisk.dev/v1.4/person/${id}`, {
    headers: {
      'X-API-KEY': '1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8',
    },
  });
  const data = await res.json();
  const dataZ = data;
  return dataZ;
};

const { data, refetch, isLoading, isError } = useQuery<PersonInfo, Error>({
  queryKey: ['todos', id],
  queryFn: () => getPerson(id),
  retry: false,
  // enabled: false,
  refetchOnWindowFocus: false,
});

const kek = computed(() => {
  if (data.value) {
    const len = data.value.profession.length-1;
    const array = data.value.profession.map((item,index)=>{
      if(data.value.profession[len] === item){
        return item.value
      }else{
        return item.value + ','
      }
    })
    return array
  }
});

const Place = computed(() => {
  if (data.value) {
    const len = data.value.birthPlace.length-1;
    const array = data.value.birthPlace.map((item,index)=>{
      if(data.value.birthPlace[len] === item){
        return item.value
      }else{
        return item.value + ','
      }
    })
    return array
  }
});



const height = computed(()=>{
  if(data.value){
    const heightValid = (String(data.value.growth)).split('')
    const len = heightValid.length-1
    const he = heightValid.map((item)=>{
      if(heightValid[len]===item){
        return item + ' М'
      }else if(heightValid[0]===item){
        return item + ','
      }else{
        return item
      }
    })
    return he.join('')
  }
})

const date = computed(()=>{
  if(data.value){
    const x = new Date(data.value.birthday)
    const z = new Date(x)
    const options = {
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      timeZoneName: 'long'
    }
    //@ts-ignore
    const y = z.toLocaleDateString('ru-RU', options)
    return y 
  }
})

const datePlace = computed(()=>{
  if(data.value){
    const x = new Date(data.value.death)
    const z = new Date(x)
    const options = {
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      timeZoneName: 'long'
    }
    //@ts-ignore
    const y = z.toLocaleDateString('ru-RU', options)
    return y 
  }
})

const diff = computed(()=>{
  const start = date.value.slice(6,10)
  const end =  datePlace.value.slice(6,10)
  const d = Number(end) - Number(start)
  return d + ' Лет';
})

watch(
  data,
  (newData,prevData) => {
    console.log('newData', newData);
    console.log('prevData', prevData);
  },
  { deep: true },
);
</script>

<template>

  <div v-if="data" class="main">
    <div class="containerMain">
      <div class="left">
        <img class="imageActor" :src="data?.photo ? data.photo : ''" alt="text" />
      </div>
      <div class="right">
        <div class="header">{{ data?.name }}</div>

        <h2>О персоне:</h2>
        <div class="about">
          <div>Карьера:</div>
          <div class="proff">
            <div class="item" v-for="item of kek">{{item}}</div>
          </div>

          <div class="height">Рост:</div>
          <div>{{ height }}</div>

          <div class="">Дата рождения:</div>
          <div>{{ date.slice(0,10) }}</div>

          <div class="">Место рождения:</div>
          <div class="proff">
            <div  class="item" v-for="item of Place"> {{ item }}</div>
          </div>

          <div class="">Дата смерти:</div>
          <div>{{ datePlace.slice(0,10) }}{{ ",  " + diff }}</div>

        </div>
      </div>
    </div>
    <h2 style="width: 60%;">Интересные факты:</h2>
    <div class="bottom">
        <div class="bottom__left">
          <div>
            <div v-for="item of data.facts" >
              <span v-html="item.value"></span>
            </div>
          </div>
        </div>
        <div class="bottom__right"></div>
    </div>
  </div>
  <div v-else-if="isLoading">Загрузка...</div>
</template>

<style scoped>
.main {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.containerMain {
  width: 60%;
  display: grid;
  grid-template-columns: 40% 60%;
}
.bottom{
  margin-top: 3px;
  width: 100%;
  /* display: grid;
  grid-template-columns: 70% 30%; */
}
.header {
  font-size: 42px;
  font-weight: 800;
}
.about {
  display: grid;
  grid-template-columns: 30% 70%;
  font-size: 13px;
  grid-gap: 43px;
}
.imageActor {
  width: 250px;
  height: 100%;
}
.proff {
  display: flex;
}
.item{
  margin-right: 5px;
}
</style>
