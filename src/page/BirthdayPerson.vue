<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

//data
const date = new Date();
const day = String(date.getDate()).padStart(2, '0');
const mouth = String(date.getMonth() + 1).padStart(2, '0');
const now = day + '.' + mouth;

//methods
const dateBirthday = (now) => {
  const text = `birthday=${now}.2000&birthday=${now}.2001&birthday=${now}.1990&birthday=${now}.1991&birthday=${now}.1992&birthday=${now}.1993&birthday=${now}.1994&birthday=${now}.1995&birthday=${now}.1996&birthday=${now}.1997&birthday=${now}.1998&birthday=${now}.1980&birthday=${now}.1981&birthday=${now}.1982&birthday=${now}.1983&birthday=${now}.1984&birthday=${now}.1985&birthday=${now}.1986&birthday=${now}.1987&birthday=${now}.1988&birthday=${now}.1989&birthday=${now}.1970&birthday=${now}.1971&birthday=${now}.1972&birthday=${now}.1973&birthday=${now}.1974&birthday=${now}.1975&birthday=${now}.1976&birthday=${now}.1977&birthday=${now}.1978&birthday=${now}.1979`;
  return text;
};
const imageLoadOnError = (e) => {
  e.target.src = 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png';
};

//composables
const getBirthday = async (now) => {
  const res = await fetch(
    `https://api.kinopoisk.dev/v1.4/person?${dateBirthday(
      now,
    )}&notNullFields=name&notNullFields=photo&notNullFields=age&notNullFields=enName`,
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
const {
  data: dataBirthday,
  refetch: refetch2,
  isLoading: isLoad2,
  isError: isEr2,
  error: error2,
} = useQuery<any, Error>({
  queryKey: ['birthday', now],
  queryFn: () => getBirthday(now),
  retry: false,
  refetchOnWindowFocus: false,
});
</script>

<template>
  <div>
    <h1 class="headText">Кто сегодня родился?</h1>
    <div v-if="!isLoad2 && dataBirthday.length === 0" class="headText1">Сегодня никто не родился ;c</div>
    <ul class="infinite-list">
      <li v-for="(person, index) in dataBirthday" :key="person.id" class="infinite-list-item">
        <RouterLink :to="{ name: 'PersonPage', params: { id: person.id } }" class="personContainer">
          <img
            @error="imageLoadOnError"
            class="photo"
            :src="
              person.photo
                ? person.photo
                : 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png'
            " />
          <div class="name">
            <div class="name__text">{{ person.name ? person.name : person.enName }}</div>
            <div class="infoText">
              <div class="name__info">Возраст: {{ person.age }}</div>
              <div class="name__info">Пол: {{ person.sex }}</div>
            </div>
            <div class="ind">{{ index + 1 }}</div>
          </div>
        </RouterLink>
      </li>
    </ul>
    <div class="err" v-if="isEr2">
      <el-col :sm="12" :lg="6">
        <el-result icon="error" title="Произошла ошибка" sub-title="Попробуйте пожалуйста позднее">
        </el-result>
      </el-col>
    </div>
    <div class="zagr" v-loading="isLoad2"></div>
  </div>
</template>

<style lang="scss" scoped>
.zagr {
  margin-top: 50px;
}
.headText {
  width: 100%;
  display: flex;
  justify-content: center;
}
.headText1 {
  width: 100%;
  display: flex;
  justify-content: center;
  color: red;
  margin-top: 30px;
}

.name__text {
  font-weight: 700;
  text-align: center;
}
.ind {
  width: 100%;
  display: flex;
  justify-content: end;
  font-size: 15px;
  margin-right: 11px;
  opacity: 0.5;
}
.infinite-list {
  height: 99%;
  padding-left: 3%;
  padding-right: 3%;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-color-primary);
  margin-bottom: 40px;
  border-radius: 20px;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.infinite-list {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}

.photo {
  border-radius: 20px 20px 0 0;
  width: 100%;
  height: 45vh;
}
.personContainer {
  border-radius: 20px;
  width: 70%;
  text-decoration: none;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 100%;
  border: 2px solid transparent;
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
}
.personContainer:hover {
  scale: 1.03;
  transition: 0.3s;
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

.err {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 600px) {
  .infinite-list {
    grid-template-columns: 100%;
  }
  .err {
    margin-top: 10px;
  }
  .headText {
    display: flex;
    justify-content: center;
    text-align: center;
  }
}
</style>
