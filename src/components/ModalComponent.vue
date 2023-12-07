<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { computed, watch } from 'vue';
import { awardsType } from '../types/index';


const props = defineProps<{
  show: boolean;
  idz?: string | string[];
}>();
// const emit = defineEmits(['close'])
const emit = defineEmits<{
  (e:'close')
}>()


const getAward = async (idz) => {
  const res = await fetch(`https://api.kinopoisk.dev/v1.4/person/awards?personId=${idz}`, {
    headers: {
      'X-API-KEY': '1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8',
    },
  });
  const data = await res.json();
  const dataZ = data.docs;
  return dataZ;
};

const { data, refetch, isLoading, isError } = useQuery<awardsType[], Error>({
  queryKey: ['modal', props.idz],
  queryFn: () => getAward(props.idz),
  retry: false,
  // enabled: false,
  refetchOnWindowFocus: false,
});

const awards = computed(() => {
  if (data.value) {
    const array = data.value.map((item) => {
      return {
        date: item.nomination.title,
        name: Object.values(item.nomination.award)[0],
        state: Object.values(item.nomination.award)[1],
        city: item.movie.name,
      };
    });
    return array;
  }
});

const hehe = ()=>{
  console.log('hehe')
  emit('close')
}


</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" @click.stop="hehe">
      <div class="modal-container">
        <div class="modal-footer">
          <slot name="footer">
            <el-table :data="awards" style="width: 100%" height="250">
              <el-table-column class="ha" prop="date" label="Победитель" width="400" />
              <el-table-column prop="name" label="Название" width="150" />
              <el-table-column prop="state" label="Год" width="150" />
              <el-table-column prop="city" label="Фильм" width="200" />
            </el-table>
            <el-button class="modal-default-button hh" @click="$emit('close')">OK</el-button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.hh{
  margin-top: 10px;
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
  width: 900px;
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

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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
.awaMain {
  border: 2px solid grey;
  margin-bottom: 20px;
}
.awa {
  border: 2px solid black;
}

@media screen and (max-width: 600px) {
  .modal-container {
    width: 300px;
  }

}
</style>
