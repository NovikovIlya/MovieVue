<script setup lang="ts">
const props = defineProps<{
  data: any;
  isFavorite: boolean;
  isFav: boolean;
  kek: string[];
  height: string;
  date: string;
  datePlace: string;
  diff: string;
  Place: string[];
}>();
const emits = defineEmits<{
  (e: 'modalka'): void;
  (e: 'check'): void;
}>();

//methods
const imageLoadOnError = (e) => {
  e.target.src = 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png';
};
</script>

<template>
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
        @click="emits('modalka')" />
      <el-tooltip
        v-if="isFavorite === false && !isFav"
        class="box-item"
        effect="dark"
        content="Добавить в избранное"
        placement="top-start">
        <el-icon class="iconFav" @click="emits('check')"><StarFilled /></el-icon>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="Добавлен в избранное"
        placement="top-start">
        <el-icon class="iconFav1" v-if="isFavorite"><CircleCheckFilled /></el-icon>
      </el-tooltip>
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
          <div class="item" v-for="(item,index) in Place">
            <RouterLink v-show="index === Place.length - 1" :to="'/country/' + item">{{ item }}</RouterLink>
            {{ index === Place.length - 1 ? '' : item }}
          </div>
        </div>
        <div class="it ff" v-show="data?.death">Дата смерти:</div>
        <div class="it" v-if="data?.death">{{ datePlace.slice(0, 10) }}{{ ',  ' + diff }}</div>
      </div>
    </div>
  </div>
  <el-divider style="width: 60%" />
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
  .right {
    margin-top: 22px;
  }
}
</style>
