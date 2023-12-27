<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '../store/index';
import { useQuery } from '@tanstack/vue-query';
import { computed, ref, watch, onMounted } from 'vue';
import { PersonInfo } from '../types/index.js';

import Spouses from '../components/SpousesComponent.vue';
import ModalComponent from '../components/ModalComponent.vue';
import MovieList from '../components/MovieList.vue';
import MessagesComponent from '../components/MessagesComponent.vue';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';
import { useIsMobile } from '../composable/useIsMobile';

// Component data and logic
const { mobile, isMobile: updateIsMobile } = useIsMobile();
const isFavorite = ref(false);
const isFav = ref(false);
const movieStore = useMovieStore();
const {
  params: { id },
} = useRoute();
const router = useRouter();
const showModal = ref(false);

// Lifecycle hooks
onMounted(() => {
  updateIsMobile();
  fav();
});

// Composable functions
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
  data: data2,
  refetch: refetch2,
  isLoading: isLoad2,
  isError: isEr2,
  error: error2,
} = useQuery<any, Error>({
  queryKey: ['todos2', id],
  queryFn: () => getPersonTwo(id),
  retry: false,
  // enabled: false,
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

const {
  data,
  refetch,
  isLoading: isLoad,
  isError: isEr,
  error,
} = useQuery<PersonInfo, Error>({
  queryKey: ['todos', id],
  queryFn: () => getPerson(id),
  retry: false,
  // enabled: false,
  refetchOnWindowFocus: false,
});

// Component methods
const open1 = () => {
  ElMessage('Персона добавлена в избранное!');
};
const chechFavorite = () => {
  isFavorite.value = true;
  movieStore.addFavorite(data);
  open1();
  isFav.value = true;
};
const kek = computed(() => {
  if (data.value)
    if (data.value.profession) {
      const len = data.value.profession.length - 1;
      const array = data.value.profession.map((item, index) => {
        if (data.value.profession[len] === item) {
          return item.value;
        } else {
          return item.value + ',';
        }
      });
      return array;
    }
});
const Place = computed(() => {
  if (data.value)
    if (data.value.birthPlace) {
      const len = data.value.birthPlace.length - 1;
      const array = data.value.birthPlace.map((item, index) => {
        if (data.value.birthPlace[len] === item) {
          return item.value;
        } else {
          return item.value + ',';
        }
      });
      return array;
    }
});
const height = computed(() => {
  if (data.value)
    if (data.value.growth) {
      const heightValid = String(data.value.growth).split('');
      const len = heightValid.length - 1;
      const he = heightValid.map((item, index) => {
        if (heightValid[len] === item && len === index) {
          return item + ' М';
        } else if (heightValid[0] === item) {
          return item + ',';
        } else {
          return item;
        }
      });
      return he.join('');
    } else {
      return '1.72 М';
    }
});
const date = computed(() => {
  if (data.value) {
    const x = new Date(data.value.birthday);
    const z = new Date(x);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'long',
    };
    //@ts-ignore
    const y = z.toLocaleDateString('ru-RU', options);
    return y;
  }
});
const datePlace = computed(() => {
  if (data.value.death) {
    const x = new Date(data.value.death);
    const z = new Date(x);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'long',
    };
    //@ts-ignore
    const y = z.toLocaleDateString('ru-RU', options);
    return y;
  }
});
const diff = computed(() => {
  const start = date.value.slice(6, 10);
  const end = datePlace.value.slice(6, 10);
  const d = Number(end) - Number(start);
  return d + ' Лет';
});
const desc = computed(() => {
  if (data.value)
    if (data.value.facts) {
      const array = data.value.facts.map((item) => {
        if (!item.value.includes('a href')) {
          return item.value;
        }
      });
      const z = array.filter((item) => {
        return item !== undefined;
      });
      return z;
    }
});
const fav = () => {
  const x = localStorage.getItem('persons') ? JSON.parse(localStorage.getItem('persons')) : [];
  x.forEach((item) => {
    if (Number(item.id) === Number(id)) {
      isFavorite.value = true;
    }
  });
};
const imageLoadOnError = (e) => {
  e.target.src = 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png';
};
const goBackMaim = () => {
  router.go(-1);
};

//watchers
watch(showModal, () => {
  document.body.classList.toggle('fix');
});
</script>

<template>
  <el-backtop :right="mobile ? 20 : 75" :bottom="100" />
  <div class="main2">
    <div class="data2">
      <div class="hahe"><el-button @click="goBackMaim"> &lt;- Назад</el-button></div>
    </div>
  </div>
  <div style="width: 100%" v-loading="isLoad" class="main">
    <div v-if="data && data.error" class="err">
      <el-col :sm="12" :lg="6">
        <el-result icon="error" title="Произошла ошибка" sub-title="Попробуйте позже"> </el-result>
      </el-col>
    </div>
    <div v-if="data && !data.error" class="data2">
      <div class="containerMain">
        <div class="left">
          <img
            @error="imageLoadOnError"
            class="imageActor"
            :src="data?.photo ? data.photo : ''"
            alt="text" />
          <img
            v-if="data && data.countAwards"
            class="imgAward2"
            src="/public/award.png"
            id="show-modal"
            @click="showModal = true" />

          <el-icon class="iconFav" v-if="isFavorite === false && !isFav" @click="chechFavorite"
            ><StarFilled
          /></el-icon>
          <el-icon class="iconFav1" v-if="isFavorite"><CircleCheckFilled /></el-icon>
        </div>
        <div class="right">
          <div class="about">
            <h1 class="hea">{{ data?.name }}</h1>
            <h2 class="it">О персоне:</h2>
            <div></div>
            <div class="it ff">Карьера:</div>
            <div class="proff vv it">
              <div class="item" v-for="item of kek">{{ item }}</div>
            </div>
            <div class="height it ff">Рост:</div>
            <div class="it">{{ height }}</div>
            <div class="it ff">Дата рождения:</div>
            <div class="it">{{ date?.slice(0, 10) }}</div>
            <div class="it ff">Место рождения:</div>
            <div class="proff it">
              <div class="item" v-for="item of Place">{{ item }}</div>
            </div>
            <div class="it ff" v-show="data?.death">Дата смерти:</div>
            <div class="it" v-if="data?.death">{{ datePlace.slice(0, 10) }}{{ ',  ' + diff }}</div>
          </div>
        </div>
      </div>

      <el-divider v-if="!data.error && data.facts && data.facts.length > 0" class="divid" />

      <h2 v-if="!data.error && data.facts && data.facts.length > 0" style="width: 60%">
        Интересные факты:
      </h2>
      <div v-if="!data.error" class="bottom">
        <div class="bottom__left">
          <div>
            <ul v-for="(item, index) in desc">
              <li v-html="item" />
              <el-divider v-if="index !== desc.length - 1" />
            </ul>
          </div>
        </div>
        <div class="bottom__right"></div>
      </div>

      <el-divider v-if="desc" class="divid" />

      <h2 v-if="data2 && data2?.spouses.length > 0" style="width: 60%">Семейное положение:</h2>
      <Spouses v-if="data2 && data2.spouses" :spouses="data2.spouses" />

      <el-divider v-if="data2 && data2?.spouses.length > 0" class="divid" />

      <div v-if="!data.error" class="wh">
        <h2 style="width: 60%">Фильмы:</h2>
      </div>
      <div v-if="data2" class="movielist">
        <MovieList :movies="data2.films" />
      </div>

      <h2 style="width: 60%">Отзывы о персоне:</h2>
      <div class="message">
        <MessagesComponent :id="id" />
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
  width: 60%;
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
