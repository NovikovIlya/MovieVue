<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useMovieStore } from '../store/index';
import { useQuery } from '@tanstack/vue-query';
import { onMounted } from 'vue';
import { PersonInfo } from '../types';

const movieStore = useMovieStore()
const {params:{id}} = useRoute()

type DataType = {

}

const getPerson = async (id) => {
  const res = await fetch(
    `https://api.kinopoisk.dev/v1.4/person/${id}`,
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

const { data, refetch, isLoading,isError } = useQuery<PersonInfo, Error>({
  queryKey: ['todos', id],
  queryFn: () => getPerson(id),
  retry: false,
  enabled: false,
  refetchOnWindowFocus: false,
});

// onMounted(()=>{
//     getPerson(id)
// })
</script>


<template>
    <div class="container">
        <div class="left">
            <img :src="data.photo" alt="text"/>
        </div>
        <div class="right">
            <h1>{{ data.name }}</h1>

            <h2>О персоне:</h2>
            <div class="about">

            </div>
        </div>
    </div>
    
</template>



<style scoped>
.container{
    display: grid;
    grid-template-columns: 30% 70%;
}
.about{
    display: grid;
    grid-template-rows: 50% 50%;
}
</style>