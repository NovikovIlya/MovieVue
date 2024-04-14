<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '../store/index';
import { useQuery } from '@tanstack/vue-query';
import { computed, ref, watch, onMounted } from 'vue';
import { PersonInfo } from '../types/index.js';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';

import Spouses from '../components/SpousesComponent.vue';
import ModalComponent from '../components/ModalComponent.vue';
import MovieList from '../components/MovieList.vue';
import MessagesComponent from '../components/MessagesComponent.vue';
import { useIsMobile } from '../composable/useIsMobile';
import VideoComponent from '../components/VideoComponent.vue';
import InfoPerson from '../components/InfoPerson.vue';
import TheFacts from '../components/TheFacts.vue';


// Data and Logic
const isFavorite = ref(false);
const isFav = ref(false);
const showModal = ref(false);
const wife = ref(false);
const router = useRouter();
const { params: { id } } = useRoute();
const { mobile, isMobile: updateIsMobile } = useIsMobile();
const movieStore = useMovieStore();

const Profession = computed(() => data.value?.profession?.map(item => item.value).join(','));
const Place = computed(() => data.value?.birthPlace?.map(item => item.value).join(','));
const height = computed(() => {
  const heightValid = String(data.value?.growth || 172).split('');
  return heightValid.map((item, index) => (index === 0 ? item + ',' : item)).join('') + ' М';
});
const date = computed(() => formatDate(data.value?.birthday));
const datePlace = computed(() => formatDate(data.value?.death) || '2023');
const diff = computed(() => {
  const start = date.value.slice(6, 10);
  const end = datePlace.value.slice(6, 10);
  return (Number(end) - Number(start) || 2023 - Number(start)) + ' Лет';
});
const desc = computed(() => data.value?.facts?.filter(item => !item.value.includes('a href')).map(item => item.value));

// Lifecycle 
onMounted(() => {
  updateIsMobile();
  fav();
});

// functions 
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'long',
  });
};

const getPersonTwo = async (id) => {
  const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff/${id}`, {
    headers: {
      'X-API-KEY': 'c20920c8-07f7-41e3-8602-7160c2c03025',
    },
  });
  const data = await res.json();
  const dataZ = data;
  return dataZ;
};
const {
  data: data2, refetch: refetch2, isLoading: isLoad2, isError: isEr2, error: error2} = useQuery<any, Error>({
  queryKey: ['todos2', id],
  queryFn: () => getPersonTwo(id),
  retry: false,
  refetchOnWindowFocus: false,
});

const getPerson = async (id) => {
  const res = await fetch(`https://api.kinopoisk.dev/v1.4/person/${id}`, {
    headers: {
      'X-API-KEY': '1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8',
    },
  });
  const data = await res.json();
  const dataZ = data;
  return dataZ;
};
const {data,isLoading: isLoad, isError: isEr, error} = useQuery<PersonInfo, Error>({
  queryKey: ['todos', id],
  queryFn: () => getPerson(id),
  retry: false,
  refetchOnWindowFocus: false,
});

const getNews = async (namez) => {
  const res = await fetch(
    `https://api.worldnewsapi.com/search-news?api-key=aedeee1ac52f4ea7b89691c01b8bcd9b&text=${namez.split(" ").slice(1,2).join('')}&language=ru&sort=publish-time&sort-direction=DESC`,
  );
  const { news } = await res.json();
  return news ? news : [];
};
const {data: dataNews, refetch: refetchNews, isLoading: isLoadNews,  isError: isErNews, error: errorNews} = useQuery<any, Error>({
  queryKey: ['news', data.value && data.value.name ? data.value.name : ''],
  queryFn: () => getNews(data.value && data.value.name ? data.value.name : ''),
  retry: false,
  enabled: false,
  refetchOnWindowFocus: false,
});


const open1 = () => {
  ElMessage('Персона добавлена в избранное!');
};

const chechFavorite = () => {
  isFavorite.value = true;
  movieStore.addFavorite(data);
  open1();
  isFav.value = true;
};

const fav = () => {
  const x = localStorage.getItem('persons') ? JSON.parse(localStorage.getItem('persons')) : [];
  x.forEach((item) => {
    if (Number(item.id) === Number(id)) {
      isFavorite.value = true;
    }
  });
};

const goBackMaim = () => {
  if (router.options.history.state.back === null) {
    router.push('/');
  } else {
    router.go(-1);
  }
};

const pokazModal = () => {
  showModal.value = true;
};

//Watchers
watch(showModal, () => {
  document.body.classList.toggle('fix');
});
watch(dataNews, () => {movieStore.fillNews(dataNews.value)},
  { deep: true, immediate: true },
);
watch(data, () => {
    if (data.value) {
      refetchNews();
    }
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <el-backtop :right="mobile ? 20 : 75" :bottom="100" />
  <div class="main2">
    <div class="data2">
      <div class="hahe">
        <el-button @click="goBackMaim"> &lt;- Назад</el-button>
        <RouterLink
          v-if="data && dataNews && dataNews.length > 0"
          class="hahe hh1"
          :to="{ name: 'personNews', params: { name: data?.name } }"
          ><div><el-button> Новости -> </el-button></div></RouterLink >
      </div>
    </div>
  </div>

  <div style="width: 100%" v-loading="isLoad" class="main">
    <div v-if="data && data.error" class="err">
      <el-col :sm="12" :lg="6">
        <el-result icon="error" title="Произошла ошибка" sub-title="Попробуйте позже"> </el-result>
      </el-col>
    </div>

    <div v-if="data && !data.error" class="data2">
      <InfoPerson
        :Place="Place"
        :date="date"
        :datePlace="datePlace ? datePlace : '2023'"
        :diff="diff"
        :height="height"
        :data="data"
        :isFavorite="isFavorite"
        :isFav="isFav"
        :kek="Profession" 
        @check="chechFavorite"
        @modalka="pokazModal"
        />

      <TheFacts v-if="desc && desc.length > 0" :desc="desc" />

      <Spouses v-if="data2 && data2.spouses.length > 0" :spouses="data2.spouses" @okWife="wife = true" />
      
      <VideoComponent :nameActor="data?.name" />

      <MovieList v-if="data2"  :movies="data2.films" />

      <div class="message">
        <MessagesComponent  :id="id" />
      </div>

      <div class="modalka">
        <Teleport to="body">
          <ModalComponent :idz="id" :show="showModal" @close="showModal = false" />
        </Teleport>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hahe {
  width: 30%;
  display: flex;
  justify-content: center;
}
.hh1 {
  display: flex;
  justify-content: end;
}
.iconFav {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  scale: 2;
  cursor: pointer;
}
.iconFav1 {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  scale: 2;
}
.back {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 1400px;
}
.back2 {
  width: 60%;
}
.divid {
  width: 60%;
}
.message {
  width: 100%;
  justify-content: center;
}
.data2 {
  width: 1400px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.err {
  display: flex;
  justify-content: center;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
.fix {
  overflow: hidden;
}
.main {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 100px;
}
.main2 {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.containerMain {
  width: 60%;
  display: grid;
  grid-template-columns: 40% 60%;
}
.left {
  position: relative;
}
.right {
  display: grid;
  grid-auto-rows: 100%;
}
.ff {
  color: rgba(0, 0, 0, 0.6);
}
.movielist {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
}
.wh {
  width: 100%;
  display: flex;
  justify-content: center;
}
.bottom {
  margin-top: 3px;
  width: 60%;
}
.header {
  font-size: 42px;
  font-weight: 800;
}
.hea {
  display: grid;
  grid-column: 1/-1;
  margin-top: 0;
}
.it {
  display: flex;
  align-items: end;
}
.about {
  display: grid;
  grid-template-columns: 35% 65%;
  font-size: 17px;
}
.imageActor {
  width: 250px;
  height: 100%;
}
.proff {
  display: flex;
}
.vv {
  flex-wrap: wrap;
}
.item {
  margin-right: 5px;
}
.imgAward {
  cursor: pointer;
}
.imgAward2 {
  width: 80px;
  z-index: 1000;
  position: fixed;
  right: 55px;
  bottom: 10px;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .hahe {
    display: flex;
    justify-content: center;
    width: auto;
  }
  .containerMain {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .imageActor {
    width: 100%;
  }
  .about {
    grid-template-columns: 24% 58%;
  }
  .back2 {
    display: none;
  }
  .imgAward2 {
    right: 0%;
  }
  .about {
    font-size: 3vw;
    grid-template-columns: 40% 60%;
  }
}
</style>
