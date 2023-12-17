<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps<{ movies: any }>();

// const dataMovie = ref([])

const movieData = computed(() => {
  if (props.movies) {
    const arrayValid = props.movies.filter((item, index) => 
      props.movies.findIndex((i) => 
        i.nameRu === item.nameRu) 
        === index,
    );
    const array = arrayValid.map((item) => {
      return {
        name: item.nameRu ? item.nameRu : 'Нет информации',
        rating: item.rating ? item.rating : null,
        role:
          item.professionKey === 'ACTOR'
            ? 'Актер'
            : item.professionKey === 'HERSELF'
            ? 'Играет саму себя'
            : item.professionKey === 'DIRECTOR'
            ? 'Режиссер'
            : item.professionKey === 'WRITER'
            ? 'Сценарист'
            : item.professionKey === 'OPERATOR'
            ? 'Оператор'
            : item.professionKey === 'COMPOSER'
            ? 'Композитор'
            : item.professionKey === 'PRODUCER'
            ? 'Продюсер'
            : item.professionKey === 'OPERATOR'
            ? 'Оператор'
            : item.professionKey === 'HIMSELF'
            ? 'Играет самого себя'
            : item.professionKey === 'HRONO_TITR_MALE'
            ? 'Нет информации'
            : item.professionKey === 'DESIGN'
            ? 'Дизайнер'
            : item.professionKey === 'HRONO_TITR_FEMALE'
            ? 'Нет информации'
            : item.professionKey,
      };
    });

    return array.filter((item) => item !== undefined);
  }
});

// const movieData2 = computed(() => {
//     const array = dataMovie.value.map((item) => {
//       return {
//         name: item.nameRu ? item.nameRu : 'Нет информации',
//         rating: item.rating ? item.rating : null,
//         year: item.year ? item.year : null,
//         role:
//           item.professionKey === 'ACTOR'
//             ? 'Актер'
//             : item.professionKey === 'HERSELF'
//             ? 'Играет саму себя'
//             : item.professionKey === 'DIRECTOR'
//             ? 'Режиссер'
//             : item.professionKey === 'WRITER'
//             ? 'Сценарист'
//             : item.professionKey === 'OPERATOR'
//             ? 'Оператор'
//             : item.professionKey === 'COMPOSER'
//             ? 'Композитор'
//             : item.professionKey === 'PRODUCER'
//             ? 'Продюсер'
//             : item.professionKey === 'OPERATOR'
//             ? 'Оператор'
//             : item.professionKey === 'HIMSELF'
//             ? 'Играет самого себя'
//             : item.professionKey === 'HRONO_TITR_MALE'
//             ? 'Нет информации'
//             : item.professionKey === 'DESIGN'
//             ? 'Дизайнер'
//             : item.professionKey === 'HRONO_TITR_FEMALE'
//             ? 'Нет информации'
//             : item.professionKey,
//       };
//     });
//     return array.filter((item) => item !== undefined);
//   }
// );

// const fetchMovies = async (movie) => {
//   // console.log('mmmm',movie)
//   for (const item of movie) {
//     if (item.filmId) {
//       // console.log('item.filmId',item.filmId)
//       const result = await fetch(
//         `https://kinopoiskapiunofficial.tech/api/v2.2/films/${item.filmId}`,
//         {
//           headers: {
//             'X-API-KEY': 'c20920c8-07f7-41e3-8602-7160c2c03025',
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       const data = await result.json();
//       // console.log('dataaaa',data)
//       //@ts-ignore
//       dataMovie.value.push(data);
//     }
//   }
// };

// watch(
//   props,
//   (newData, prevData) => {
//     console.log('NewpropsMovie', newData);
//     console.log('prevPropMovie', prevData);
//     if(props.movies){
//       fetchMovies(props.movies);
//     }
//     console.log('dataMovie',dataMovie.value)
//   },
//   { deep: true, immediate: true },
// );
</script>

<template>
  <el-table
    table-layout="auto"
    :default-sort="{ prop: 'rating', order: 'descending' }"
    :data="movieData"
    style="width: 60%"
    height="100%">
    <el-table-column class="ha" prop="name" label="Название фильма" sortable />
    <el-table-column prop="role" label="Роль" sortable />
    <el-table-column prop="rating" label="Рейтинг КП" sortable />
  </el-table>
  <!-- <el-table
    table-layout="auto"
    :default-sort="{ prop: 'rating', order: 'descending' }"
    :data="movieData2"
    style="width: 60%"
    height="100%">
    <el-table-column class="ha" prop="name" label="Название фильма" sortable />
    <el-table-column prop="role" label="Роль" sortable />
    <el-table-column prop="rating" label="Рейтинг КП" sortable />
    <el-table-column prop="year" label="Год" sortable />
  </el-table> -->
</template>

<style scoped></style>
