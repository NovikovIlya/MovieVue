<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { onClickOutside } from '@vueuse/core'
import 'element-plus/es/components/message/style/css'; // this is only needed if the page also used ElMessage
import 'element-plus/es/components/message-box/style/css';

const props = defineProps<{
  id: string | string[];
}>();

//data
const target = ref(null)
const showModalMessage = ref(false);
const form = ref({
  name: '',
  desc: '',
});

//composables
onClickOutside(target, event => {
  showModalMessage.value = false}
)

const {
  data: dataPost,
  mutate,
} = useMutation({
  mutationFn: (newTodo: any) =>
    axios.post('https://backmovie.onrender.com/auth/sendperson', newTodo),
});
const { data: dataGet, mutate: muta } = useMutation<any>({
  mutationFn: (newTodo: any) =>
    axios.post('https://backmovie.onrender.com/auth/getperson', newTodo),
});


//methods
const onSubmit = () => {
  const data = {
    id: props.id,
    messages: { name: form.value.name, message: form.value.desc },
  };

  mutate(data);
  form.value.name = '';
  form.value.desc = '';
  showModalMessage.value = false;

};
const open1 = () => {
  ElMessage('Сообщение отправлено');
};
const haha =(e)=>{
}


//watchers
watchEffect(() => {
  if (props.id) {
    //@ts-ignore
    muta({ id: props.id });
  }
});

watch(showModalMessage, () => {
  document.body.classList.toggle('fix');
});

watch(
  dataPost,
  () => {
    if (dataPost.value.data.message.includes('Сообщение добавлено')) {
      open1();
    }
  },
  { deep: true },
);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showModalMessage"  class="modal-mask">
        <div ref="target" @click.stop="haha" class="modal-container">
          <el-form :model="form" label-width="120px">
            <el-form-item label="Ваше имя:">
              <el-input v-model="form.name" />
            </el-form-item>

            <el-form-item label="Текст:">
              <el-input click.stop v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Отправить</el-button>
              <el-button @click="showModalMessage = false">Закрыть</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </Transition>
  </Teleport>
  <div class="h2style"><h2 style="width: 60%">Отзывы о персоне:</h2></div>
  <div class="showMess">
    <div class="showMessChild">
      <el-button @click="showModalMessage = true">Отправить отзыв</el-button>
    </div>
  </div>
  <div class="recenzii">
    <div v-for="item of dataGet?.data.messages">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>{{ item.name }}</span>
          </div>
        </template>
        <div class="text item">{{ item.message }}</div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.h2style{
  display: flex;
  justify-content: center;
}
.box-card{
  margin-bottom: 20px;
}
.recenzii {
  width: 60%;
  margin: 0 auto;
}
.showMess {
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 500px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}


.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
