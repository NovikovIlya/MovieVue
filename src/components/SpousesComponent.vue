<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue';
import { type spousesType } from '../types';

const props = defineProps<{
  spouses: any;
}>();

const dataSpouses = ref<spousesType[] | []>([]);

const fetchSpouses = async (spouses) => {
  for (const item of spouses) {
    if (item.personId) {
      const result = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v1/staff/${item.personId}`,
        {
          headers: {
            'X-API-KEY': 'c20920c8-07f7-41e3-8602-7160c2c03025',
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await result.json();
      //@ts-ignore
      dataSpouses.value.push(data);
    }
  }
};

watch(
  props,
  (newData, prevData) => {
    console.log('newProp', newData);
    console.log('prevProp', prevData);
    fetchSpouses(props.spouses);
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <div class="container">
    <div v-for="spouse in dataSpouses" :key="spouse.personId">
     
      <div class="containerInfo">
        <img class="img" :src="spouse.posterUrl" />
        <div class="item">
            <div class="wh">Имя: {{ spouse.nameRu }}</div>
            <div class="wh">Семейный статус: {{ spouse.spouses[0].divorcedReason }}</div>
            <div class="wh">Дети: {{ spouse.spouses[0].children }}</div>
            
        </div>
        <div class="item">
            <div class="wh">Дата рождения: {{ spouse.birthday }}</div>
            <div class="wh">Дата смерти: {{ spouse.death }}</div>
            <div class="wh">Возраст:  {{ spouse.age }}</div>
        </div>
       
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 60%;
}
.img {
  width: 90px;
}
.containerInfo{
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: 14% 40% 40%;
}
.item{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.wh{
    width: 100%;
}
</style>
