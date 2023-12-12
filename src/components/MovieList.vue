<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ movies: any }>();


const movieData = computed(() => {
  if (props.movies) {
    const array = props.movies.map((item) => {
      // if (item.name && item.description && item.rating && item.enProfession) {
        return {
          name: item.name ? item.name : 'Нет информации',
          desc: item.description ? item.description : 'Нет информации',
          rating: item.rating ? item.rating : 'Нет информации',
          role: item.enProfession 
          // === 'uncredited' ? 'Нет в титрах' 
          // : item.enProfession === 'actor' ? 'Актер' 
          // : item.enProfession === 'cameo' ? 'Камео'
          // : item.enProfession === 'producer' ?  'Продюссер' : item.enProfession,

        
      }
    });
    // const x = array.filter((item) => {
    //    if(item === undefined){
    //     return 'Нет информации'
    //   }
    // });
    return array;
  }
});

</script>

<template>
    <el-table
    table-layout="auto"
      :default-sort="{ prop: 'rating', order: 'descending' }"
      :data="movieData"
      style="width: 60%"
      height="100%">
      <el-table-column class="ha" prop="name" label="Название фильма" sortable />
      <el-table-column prop="desc" label="Описание" sortable />
      <el-table-column prop="rating" label="Рейтинг КП" sortable  />
      <el-table-column prop="role" label="Роль" sortable  />
    </el-table>
</template>

<style scoped></style>
