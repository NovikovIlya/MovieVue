<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { ref, onMounted } from 'vue';
import { useMovieStore } from '../store/index';

const {
  params: { id },
} = useRoute();
const movieStore = useMovieStore();

const total = ref(1);
const pagination = ref(1);

const getSearch = async (id, pagination) => {
  var res = await fetch(
    `https://api.kinopoisk.dev/v1.4/person/search?limit=15&query=${id}&page=${pagination.value}`,
    {
      headers: {
        'X-API-KEY': '1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8',
      },
    },
  );

  const data = await res.json();
  const list = data.pages;
  total.value = list;
  const dataZ = data.docs;
  return dataZ;
};

const {
  data,
  refetch,
  isLoading,
  isError: isErr,
} = useQuery<any, any>({
  queryKey: ['todos', id, pagination],
  queryFn: () => getSearch(id, pagination),
  retry: false,

  refetchOnWindowFocus: false,
});

const imageLoadOnError = (e) => {
  e.target.src = 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png';
};

onMounted(() => {
  movieStore.setShowModalTrue();
});
</script>

<template>
  <div v-loading="isLoading" class="load"></div>  
  <div >
    <div>
    <RouterLink :to="'/person/' + item.id" class="inp2" :key="item.id" v-for="item of data">
      <div class="nameAct">
        <img @error="imageLoadOnError" class="img" :src="item.photo ? item.photo : ''" />
        <div class="nameAct">{{ item.name }}</div>
        {{ item.title }}
        <div>{{ item.age === undefined ? item.type : '' }}</div>
        {{ (item?.age && item.age === 0) || item.age === undefined ? '' : ',' + ' ' + item.age }}
      </div>
    </RouterLink>
  </div>
  <div v-show="!isLoading" class="example-pagination-block">
    <el-pagination v-model:current-page="pagination" layout="prev, pager, next" :page-count="total" />
  </div>
  </div>
</template>

<style scoped>
.load{
    position: absolute;
    top: 42%;
    left: 48%;
}
.example-pagination-block{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
}
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

.el-message {
  position: absolute;
}
.container {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container {
  padding-left: 5%;
  padding-right: 5%;
}
.ss {
  margin-top: 10px;
}
.imgLogo {
  width: 150px;
  margin-left: -5px;
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
  width: 231px;
  /* width: 22%; */
}
.spis2 {
  position: absolute;
  z-index: 1000;
  width: 231px;
  /* width: 22%; */
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
.inp :focus {
  border: 2px solid rgb(124, 138, 255);
}
.inp2 {
    
    width: 50%;
    margin:  0 auto;
    margin-top: 20px;
    margin-bottom: 10px;
    justify-content: center;
  text-decoration: none;
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
.blk {
  box-shadow: 10px 8px 0px rgb(191 219 254);
}
.img {
  width: 30px;
  height: 30px;
  margin-right: 8px;
}
.switcherStyle {
  display: flex;
  width: 100%;
  justify-content: center;
}
.nameAct {
  display: flex;
  align-items: center;
}
@media screen and (max-width: 600px) {
  .container {
    justify-content: center;
    flex-wrap: wrap;
  }
  .imgLogo {
    margin: 0 auto;
    margin-bottom: 10px;
  }
  .mainInp {
    margin: 0 auto;
    margin-bottom: 10px;
  }
  .men {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .spis {
    width: 300px;
  }
  .ss {
    width: 300px;
    z-index: 1000;
  }
  .it {
    align-items: center;
  }
  .proff {
    flex-wrap: wrap;
  }
  .el-table {
    width: 80%;
    font-size: 10px;
  }
  .el-table__column-resize-proxy {
    font-size: 10px;
  }
  .inp {
    width: 266px;
  }
}
</style>
