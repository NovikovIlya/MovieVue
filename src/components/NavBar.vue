<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { dataTagSymbol, useQuery } from '@tanstack/vue-query';
import CustomMenu from './UI/CustomMenu.vue';
import { useMovieStore } from '../store/index';

defineProps<{ modal: boolean }>();

const movieStore = useMovieStore();

const inputValue = ref('');

const getTodos = async (name: any) => {
  const res = await fetch(
    `https://api.kinopoisk.dev/v1.4/person/search?query=${inputValue.value}`,
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

const { data, refetch, isLoading, isPending } = useQuery<any, any>({
  queryKey: ['todos', inputValue],
  queryFn: () => getTodos(inputValue),
  retry: false,
  enabled: false,
  refetchOnWindowFocus: false,
});

function onInputChange() {
  refetch();
}

const showModal = () => {
  movieStore.setShowModalTrue();
};
const showModalFalse = () => {
  movieStore.setShowModalFalse();
};
const imageLoadOnError = (e)=>{
  e.target.src = "https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png"
}
</script>

<template>
  <div @click="showModal" class="container">
    <div>ПриветЛюдям!</div>

    <div>
      <input
        class="inp"
        @keypress.enter.stop
        @click.stop="showModalFalse"
        v-model.stop="inputValue"
        @input.stop="onInputChange"
        type="text" />

      <div :class="['spis','blk',movieStore.showModal ? 'hidden' : '', 'kek']">
        <RouterLink 
          :to=" 'person/' + item.id"
          @click.stop="showModal"
          class="inp2"
          v-for="item of data">
            <img @error="imageLoadOnError" class="img" :src="item.photo"/> {{ item.name }} {{ item.id }}
        </RouterLink >
      </div>

      <div class="spis2" v-if="isLoading">
        <el-skeleton animated style="width: 100%">
          <template #template>
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="margin-right: 16px" />
          </template>
        </el-skeleton>
      </div>
    </div>

    <div class="men">
      <CustomMenu />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.autoInput {
  position: absolute;
  right: 33%;
}
.hidden {
  visibility: hidden;
  color: aqua;
}

.spis {
  position: absolute;
  z-index: 1000;
  width: 22%;
}
.spis2 {
  position: absolute;
  z-index: 1000;
  width: 22%;
}

.inp {
  width: 100%;
  color: rgb(36, 35, 42);
  font-size: 16px;
  line-height: 20px;
  min-height: 28px;
  border-radius: 4px;
  padding: 8px 16px;
  border: 2px solid transparent;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
  background: rgb(251, 251, 251);
  transition: all 0.1s ease 0s;
}
.inp :focus {
  border: 2px solid rgb(124, 138, 255);
}
.inp2 {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: rgb(36, 35, 42);
  font-size: 16px;
  line-height: 20px;
  min-height: 28px;
  border-radius: 4px;
  padding: 8px 16px;
  border: 2px solid transparent;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
  background: rgb(251, 251, 251);
  transition: all 0.1s ease 0s;
}
.blk{
  box-shadow: 10px 8px 0px rgb(191 219 254);
}
.img{
  width: 30px;
  height: 30px;
  margin-right: 8px;
}
@media screen and (max-width: 600px) {
  .men {
    width: 100%;
  }
  .autoInput {
    position: relative;
  }
}
</style>
