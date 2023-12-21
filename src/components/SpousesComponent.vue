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
    <div v-for="(spouse,index) in dataSpouses" :key="spouse.personId">
     
      <div class="containerInfo">
        <img class="img" :src="spouse.posterUrl" />
        <div class="item">
            <div class="wh"><span class="td">Имя:</span> {{ spouse.nameRu }}</div>
            <div class="wh"><span class="td">Семейный статус:</span> {{ spouse.spouses[0].divorcedReason }}</div>
            <div class="wh"><span class="td">Дети:</span> {{ spouse.spouses[0].children }}</div>
            
        </div>
        <div class="item">
            <div class="wh"><span class="td">Дата рождения:</span> {{ spouse?.birthday?.replace(/-/g, '.') }}</div>
            <div class="wh"><span class="td">Дата смерти</span> {{ spouse?.death?.replace(/-/g, '.') }}</div>
            <div class="wh"><span class="td">Возраст:</span>  {{ spouse.age }}</div>
        </div>
        
      </div>
      <div v-if="dataSpouses.length-1 !== index" class="dvidMain"><el-divider  class="divid" /></div>
    </div>
  </div>
</template>

<style scoped>
.dvidMain{
  width: 100%;
  display: flex;
  justify-content: center;
}
.divid{
  width: 75%;

}
.container {
  width: 60%;
}
.img {
  width: 90px;
}
.containerInfo{
    font-size: 17px;
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
.td{
  color:rgba(0, 0, 0, 0.6)
}

@media screen and (max-width: 600px) {
  .containerInfo{
    grid-template-columns: 100%;
    font-size: 17px;
  }
  .img{
    margin-bottom: 10px;
  }
  .wh{
    margin-bottom: 10px;
  }
}
</style>
