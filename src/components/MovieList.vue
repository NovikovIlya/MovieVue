<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ movies: any }>();

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
</script>

<template>

  <div class="wwhh">
    <h2 style="width: 60%">Фильмы:</h2>
  </div>
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
</template>

<style scoped>
.wwhh{
  width:100%;
  display: flex;
  justify-content: center;
}
</style>
