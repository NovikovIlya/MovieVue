<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { ref, computed } from 'vue';

//data
const input = ref('');

//composable
const getAllCountry = async (name) => {
  const res = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await res.json();
  const dataZ = data;
  return dataZ;
};
const {
  data: data2,
  refetch: refetch2,
  isLoading: isLoad2,
  isError: isEr2,
  error: error2,
} = useQuery<any, Error>({
  queryKey: ['countryAll', name],
  queryFn: () => getAllCountry(name),
  retry: false,
  //   enabled: false,
  refetchOnWindowFocus: false,
});

//computed
const dataSort = computed(() => {
  const ara = data2.value.map((item) => {
    if (item.population > 10000000) {
      return {
        name: item.translations.rus.common,
        nameEng: item.name.common,
        photo: item.flags.png,
      };
    }
  });
  const x = ara.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return x;
});

//methods
function filteredList() {
  return dataSort.value.filter((item) =>
    item?.name?.toLowerCase().includes(input.value.toLowerCase()),
  );
}
</script>

<template>
  <div class="mainInp">
    <input class="inp" type="text" v-model="input" placeholder="Поиск по странам" />
  </div>
  <div class="main" v-if="data2">
    <div v-for="item of filteredList()">
      <div class="parentImage">
        <RouterLink :to="'/country/' + item.name">
          <figure>
            <img class="image" :src="item.photo" alt="flag" />
            <figcaption class="fig">
              {{ item.name.length > 10 ? item.name.substring(0, 10) + '...' : item.name }}
            </figcaption>
          </figure>
        </RouterLink>
      </div>
    </div>
  </div>

  <div class="error" v-loading="isLoad2" v-if="isLoad2"></div>

  <div v-if="isEr2" class="error">
    <el-col :sm="12" :lg="6">
      <el-result icon="error" title="Произошла ошибка" sub-title="Попробуйте позже"> </el-result>
    </el-col>
  </div>
</template>

<style scoped>
.error {
  margin-top: 50px;
}
.main {
  width: 70%;
  margin: 0 auto;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}
.mainInp {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.inp {
  color: rgb(36, 35, 42);
  font-size: 16px;
  line-height: 20px;
  min-height: 20px;
  border-radius: 4px;
  padding: 8px 16px;
  border: 2px solid transparent;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
  background: rgb(251, 251, 251);
  transition: all 0.1s ease 0s;
}
.parentImage {
  width: 300px;
}
.image {
  width: 100%;
  height: 150px;
}

.fig {
  color: white;
  text-align: center;
  z-index: 1000;
  margin-top: -33px;
  background-color: black;
  opacity: 0.5;
  width: 100%;
}
.parentImage:hover {
  opacity: 0.8;
}
</style>
