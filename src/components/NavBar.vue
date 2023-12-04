<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import CustomMenu from './UI/CustomMenu.vue';
import { useMovieStore } from '../store/index';
import { DataType } from '../types';
import { useRoute,useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'; // this is only needed if the page also used ElMessage
import 'element-plus/es/components/message-box/style/css';

defineProps<{ modal: boolean }>();

const movieStore = useMovieStore();
const inputValue = ref('');
const switcher = ref('Люди')
const route = useRoute()

const getPerson = async (inputValue) => {
  if(inputValue.value.length <= 0){
    return
  }
  if(switcher.value === 'Люди'){
    var res = await fetch(
    `https://api.kinopoisk.dev/v1.4/person/search?limit=10&query=${inputValue.value}`,
    {
      headers: {
        'X-API-KEY': '1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8',
      },

    },
  );
  }
  else{
    var res = await fetch(
    `https://api.kinopoisk.dev/v1.4/studio?title=${inputValue.value}`,
    {
      headers: {
        'X-API-KEY': '1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8',
      },
    },
  );
  }
  
  const data = await res.json();
  const dataZ = data.docs;
  return dataZ;
};

const { data, refetch, isLoading,isError:isErr } = useQuery<DataType[], any>({
  queryKey: ['todos', inputValue],
  queryFn: () => getPerson(inputValue),
  retry: false,
  enabled: false,
  refetchOnWindowFocus: false,
});

const open4 = () => {
  ElMessage.error('Произошла ошибка, попробуйте позже.')
}

function onInputChange() {
  if(inputValue.value.length <= 0){
    return
  }
  refetch();
}

const showModal = () => {
  movieStore.setShowModalTrue();
};
const showModalFalse = () => {
  movieStore.setShowModalFalse();
};
const imageLoadOnError = (e) => {
  e.target.src = 'https://myivancrismanalo.files.wordpress.com/2017/10/cropped-unknown_person.png';
};

watch(switcher,(newSwitcher)=>{
  console.log('switcher',switcher)
  console.log('newSwitcher',newSwitcher)
  refetch()
})
watch(isErr,()=>{
  if(isErr.value===true){
    open4()
  }
})

</script>

<template>
  <div @click="showModal" class="container">
    <RouterLink to="/">
      <img class="imgLogo" src="https://i.ibb.co/qkXN6VH/photo-2023-11-27-22-37-57.jpg"/>
    </RouterLink>
    <div>
    <div class="switcherStyle">
      <el-radio-group v-model="switcher" size="large">
      <el-radio-button label="Люди" />
      <el-radio-button label="Студии" />
    </el-radio-group>
    </div>
    
    <div class="mainInp">
      <input
        class="inp"
        @keypress.enter.stop
        @click.stop="showModalFalse"
        v-model.stop="inputValue"
        @input.stop="onInputChange"
        type="text" />

      <div :class="['spis', 'blk', movieStore.showModal ? 'hidden' : '', 'kek']">
        <RouterLink
          :to="'/person/' + item.id"
          @click.stop="showModal"
          class="inp2"
          :key='item.id'
          v-for="item of data">
          <div class="nameAct" v-if="item.name?.length > 0 || item.title?.length > 0">
            <img @error="imageLoadOnError" class="img" :src="item.photo ? item.photo : ''" /> 
            <div class="nameAct">{{ item.name }}</div>
            {{ item.title }}
           <div> {{  item.age === undefined ? item.type : '' }}</div>
           {{item?.age && item.age === 0 || item.age === undefined ? '' : ',' + ' ' + item.age}}
          </div>
          
        </RouterLink>
      </div>
      </div>
      <div class="spis2 ss" v-if="isLoading">
        <el-skeleton animated style="width: 100%; height: 24px">
          <template #template>
            <el-skeleton-item  variant="text" style="margin-right: 16px;height: 24px" />
            <el-skeleton-item variant="text" style="margin-right: 16px;height: 24px" />
            <el-skeleton-item variant="text" style="margin-right: 16px;height: 24px" />
            <el-skeleton-item variant="text" style="margin-right: 16px;height: 24px" />
          </template>
        </el-skeleton>
      </div>
      <!-- <div class="spis2" v-if="isError">Произошла ошибка, попробуйте позже</div> -->
    </div>

    <div class="men">
      <CustomMenu />
    </div>
  </div>
</template>

<style scoped>
.el-message {
  position: absolute;
}
.container {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ss{
  margin-top: 10px;
}
.imgLogo{
  width: 150px;
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
  /* width: 100%; */
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
.switcherStyle{
  display: flex;
  width: 100%;
  justify-content: center;
}
.nameAct{
  display: flex;
  align-items: center;
}
@media screen and (max-width: 600px) {
  .container{
    justify-content: center;
    flex-wrap: wrap;
  }
  .imgLogo{
    margin: 0 auto;
    margin-bottom: 10px;
  }
  .mainInp{
    margin: 0 auto;
    margin-bottom: 10px;
  }
  .men {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  /* .autoInput {
    position: relative;
  } */
}
</style>
