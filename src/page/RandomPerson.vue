<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

//data
const random = ref(null);

//composable
const getPerson = async (random) => {
  try {
    const res = await fetch(`https://api.kinopoisk.dev/v1.4/person/${random.value}`, {
      headers: {
        'X-API-KEY': '1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8',
      },
    });
    const data = await res.json();
    const dataZ = data;
    return dataZ;
  } catch (error) {
    console.log(error);
    update();
  }
};
const {
  data,
  refetch,

} = useQuery<any, Error>({
  queryKey: ['todos', random],
  queryFn: () => getPerson(random),
  retry: false,
  enabled: false,
  refetchOnWindowFocus: false,
});

//methods
const update = () => {
  getRandom(1, 10000);
  refetch();
};
const getRandom = (min: number, max: number) => {
  //Диапозон округляем
  min = Math.ceil(min);
  max = Math.floor(max);
  random.value = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(random.value);
};
console.log('ran', random);

const imageLoadOnError = (e) => {
  e.target.src = 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png';
};
</script>

<template>
  <div>
    <button @click="update">Клик</button>
    <div v-if="data">
      <RouterLink
        v-if="data.id"
        :to="{ name: 'PersonPage', params: { id: data.id } }"
        class="personContainer">
        <img
          @error="imageLoadOnError"
          class="photo"
          :src="
            data.photo
              ? data.photo
              : 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png'
          " />
        <div class="name">
          <div class="name__text">{{ data.name ? data.name : data.enName }}</div>
          <div class="infoText">
            <div class="name__info">Возраст: {{ data.age }}</div>
            <div class="name__info">Пол: {{ data.sex }}</div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
