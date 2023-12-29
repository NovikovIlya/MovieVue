<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

//data
const router = useRouter();
const random = ref(null);

//composable
const getPerson = async (random) => {
  try {
    const res = await fetch(`https://api.kinopoisk.dev/v1.4/person/${random.value}`, {
      headers: {
        'X-API-KEY': '1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8',
      },
    });
    if (res.status === 404) {
      throw new Error('Person not found');
    }
    const data = await res.json();
    const dataZ = data;
    return dataZ;
  } catch (error) {
    console.log('ошибка',error);
    update();
  }
};
const {
  data,
  refetch,

} = useQuery<any, Error>({
  queryKey: ['todos', random],
  queryFn: () => getPerson(random),
  retry: false,
  enabled: false,
  refetchOnWindowFocus: false,
});

//methods
const update = () => {
  getRandom(1, 10000);
  refetch();
};
const getRandom = (min: number, max: number) => {
  //Диапозон округляем
  min = Math.ceil(min);
  max = Math.floor(max);
  random.value = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(random.value);
};

const imageLoadOnError = (e) => {
  e.target.src = 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png';
};
const goBackMaim = () => {
  router.go(-1);
};
</script>

<template>
  <div class="container">
    <div class="head">
      <el-button @click="goBackMaim"> &lt;- Назад</el-button>
      <el-button @click="update">Случайная персона -> </el-button>
    </div>
    
    <div class="main" v-if="data">
      <RouterLink
        v-if="data.id"
        :to="{ name: 'PersonPage', params: { id: data.id } }"
        class="personContainer">
        <img
          @error="imageLoadOnError"
          class="photo"
          :src="
            data.photo
              ? data.photo
              : 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png'
          " />
        <div class="name">
          <div class="name__text">{{ data.name ? data.name : data.enName }}</div>
          <div class="infoText">
            <div v-show="data?.age" class="name__info">Возраст: {{ data.age }}</div>
            <div v-show="data?.sex" class="name__info">Пол: {{ data.sex }}</div>
          </div>
        </div>
      </RouterLink>
    </div>
    
  </div>
</template>

<style scoped lang="scss">
.container{
  margin: 0 auto;
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-self: center;
}
.main{
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.head{
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.container {
  padding-left: 5%;
  padding-right: 5%;
}
.name__text {
  font-weight: 700;
}
.photo {
  border-radius: 20px 20px 0 0;
  width: 100%;
  height: 45vh;
}
.personContainer {
  border-radius: 20px;
  width: 40%;
  text-decoration: none;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 100%;
  border: 2px solid transparent;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
}
.infoText {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.name {
  margin-top: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &__text {
    margin-bottom: 5px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  &__info {
    margin-bottom: 5px;
    font-size: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
}

@media screen and (max-width: 600px) {
  .personContainer{
    width: 100%;
  }
  .name__text{
    font-size: 14px;
  }
}
</style>
