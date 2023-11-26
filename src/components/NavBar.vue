<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { dataTagSymbol, useQuery } from '@tanstack/vue-query';
import CustomMenu from './UI/CustomMenu.vue';

const inputValue = ref('');
const modal = ref(false);

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

function onInputChange(event: any) {
  inputValue.value = event.target.value;
  console.log('inputValue.value', inputValue.value);
  if(event.target.value){
    refetch();
  }
 
}

const showModal = () => {
  modal.value = !modal.value;
};
</script>

<template>
  <div @click.stop="showModal" class="container">

    <div>ПриветЛюдям!</div>

    <div class="autoInput">
      <input
        @keypress.enter.stop
        @click.stop
        v-model.stop="inputValue"
        @change.stop="onInputChange"
        type="text" />
      <div :class="{ hidden: modal }" v-for="item of data">{{ item.name }} {{ item.id }}</div>
      <div v-if="isPending && inputValue?.length > 0">Введите нужное имя!</div>
      
      <div v-if="isLoading">Идет загрузка...</div>
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
}
.autoInput {
  position: absolute;
  right: 33%;
}
.hidden {
  visibility: hidden;
  color: aqua;
}
.men {
  width: 14%;
  position: absolute;
  right: 10px;
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
