<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useMovieStore } from '../store/index';
import { useQuery } from '@tanstack/vue-query';
import { onMounted, computed, ref, watch } from 'vue';
import { PersonInfo } from '../types/index.js';
import ModalComponent from '../components/ModalComponent.vue';

const route = useRoute()
const movieStore = useMovieStore();
const {
  params: { id },
} = useRoute();
const showModal = ref(false);

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

const { data, refetch, isLoading, isError } = useQuery<PersonInfo, Error>({
  queryKey: ['todos', id],
  queryFn: () => getPerson(id),
  retry: false,
  // enabled: false,
  refetchOnWindowFocus: false,
});

const kek = computed(() => {
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
  if (data.value) {
    const heightValid = String(data.value.growth).split('');
    const len = heightValid.length - 1;
    const he = heightValid.map((item) => {
      if (heightValid[len] === item) {
        return item + ' М';
      } else if (heightValid[0] === item) {
        return item + ',';
      } else {
        return item;
      }
    });
    return he.join('');
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
  if (data.value) {
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
  console.log('data.value.facts', data.value.facts);
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

watch(
  data,
  (newData, prevData) => {
    console.log('newData', newData);
    console.log('prevData', prevData);
  },
  { deep: true },
);
// watch(route,(newData, prevData)=>{
//   console.log('newData', newData);
//     console.log('prevData', prevData);
//   refetch()
// })
</script>

<template>
  <div v-if="data" class="main">
    <div class="containerMain">
      <div class="left">
        <img class="imageActor" :src="data?.photo ? data.photo : ''" alt="text" />
        <img
        class="imgAward2"
        src="https://www.kinopoisk.ru/1z49p2P01/284533PN6/_NMYuZOQBnU1Y1ryuNOiQLSV7KFJg210-gwtDiSdU2fUa0vNweYVoHIHe_x9IbFYFAJ2W1aBRsdrbnVkPWGbO8n2FJyr7AdtIHI-ruHjhxHE6MHlENYwVT7IvduQffv-RMu_JKDzCdkfbhb9dRjUVXh7f0rLLQdiWk9ldXi4x3KULx2UGijW7VUj_t4lo85YRfXEqaVPLVFiEPnTkN1v8lTnM3jIC2Cp_26yqXVM0IWZWzOul4xblmq_8XWgoHdyjJtRsOqUOp2dh1YeoSMecPHhXK1le6H1HmC1V3A9y5Y4bzP0qH8YdbuulnGluKBV8U8nCutwt8Jur-mhMNCPpsh78TCGjD6FcacG8ikDgli1RdhB9RcZHRI8CXcwXWuq2DOrXJS_BPWnGiqBISxUkTEXlzJ7gG-aVtdR0dAkO6J82_lgJnBG8SGb1m5xp1LEme3QxUkvJfVKXO17IAlX_rCDT4xg7-DlF2KOefloxL1RF_cmY9hnnqaHiWl46Pv6bDeZcKbE6n3VG8qmxdtyfF2pEJ0xT60R0uDt25TdByLUf3Mo4DNANSPuuhlhaGTRWVsLxqe45y6-B60l9AgD-uCjxTjOzEJF5f-Wkl0_9gSZKaixYY-RTVLkUVf8SSdiLMfLTHi7dKW3knIV-bT4vbWrJ4Yj4N8u9u9h3Sh4gz4wx2GY4pSKPYkT-o6l-17o1R2wFS0nsVlidIEfCGUbivTbKwhA-9j9v2qS3bGIeNEBXwP2azDPcvo3pVloJBfKTCOdEIrgjrWR_9p6yW-qkOF1mEVJC8V1nlSly8DZdyZU90-gyEsUteselgF5xNy96QcvhuNUqwKeEzk1cBj_OrCfTXDieLplVRO2nhUj1px1NTD9fb-9MZI4tecEiXMGzINTRGTz5N0TZmZhHajUuZknc5rTRNcK2ktlHeiYA_6gj-1YMjRmFdH3ShZ9I34EwW0kFX0fIdWWPKE7iMFLLsADCwAw7zStN176ba346LVxyzs6Y3TXDg5nVeEg1M-SpJdpxMZ0uul5ex7mHWeS5Gm9uIVtH1m5YlSdj1yZS7pc34cwGCsYee_qZsmVBDjFZfubNocwi-YS3_HxjDT_CuA3yTQigD5tdav-vnEnVpSlHbwhSZutdeqMHevw3cuqBBNzALS_7L13fg4BJcTY-dkDK4ojTLuutoP5vUyol46Es_Ec-sRe5fmH_vLRg7pk1b28uaUD7XXGXKFT0MkfZkB3K4ycBxC1i3aaSbGUpKXRZ38Wq7g74m6bVWVM8E_6_At9RO74Oqkt056GFdem-FWhqJUxj-0p-gyNTzRdfyLY26-8xJ9wTb9-gvl5MGSFfYdzQu_UV2qqx1kpZKAzfgyXZfRGfEL9qY8Wsnm_EthRoZj1bQsZNZa4ecssLRea1Ht_DPiX8FX_BpaZhfiwxXGnPyqP1O_2Jp-Jrbj8e-4Iu-EYkmAGhZk7Nm7l_34YYZGAReFDZc0K8FHPiNGnPkAb8wTgq0iFf9qyCXXA6IW1_6-Oo4wvbgY3-bXI5O-aKCPdmMq0xqFRjzoGucMKxO0dXMHVDzURSviZb5A9LxI0Cycw0MuwiQcqfgU5_ESFcVt71mc0HwpyQ21lVOTH_nhXRUjGMModZXvunuEv3mjRJZQ5-ZdJLQrQqXd41WPquP-vQLx_bMl3xhbR5cRs-Q37I9a7iBPutscZPQgs__b8S8GEnqjCPQ1XagLNV4Y4JeEE_eH7IbWKsPnjvEETbswzo8BUe4itE4IWmRnEFA01G3Myrzhbxq67ecXQcA-uxNfF3A5gWnUpl87eeXsuyN1JQGHV90F9WpQZC7ShF3bcN8eYZJ8w1b-KfmHl7CwN_VsDAn94z4aq52mdUJxnhjgPFVwmPJYBeXN2FrnvSghx-cS53Yc5HU48nY-UsSMGfA_DVCSnCAEDgv4NlZz4EWlPOwIbWGfKNm8FYWTsGwLkI_0ENgA6ZRmb2qaxdzrMXTkkdU3HTbkSYB17OLUbLlgTQ_QoKxx1Y_rOzSE8aH0x53te8-Snaro7mUFc_BcKYAsFcEr4KpFRO7pmQe_WBF2RWB2Zs-EtBhiJj5TlG7K451MIUCNIqZcWjhlxMDBVXY8DOl-0M2oiawFxpITvQvxbSXy2BAadhXdiltnHxtg18VAhbb8Z1aZQEZuw6eNWeFMzEBQPTG13ikal_YB0OXGPJ8KTOBuKms_RRQw0Z_I0p31EorjeZdWvwoox31qMwZWY4XW3KUECEN1_RMXzVuy3E9TQozxJ4-LmdRF8OIXly2OCe9TjDuoDPTmoVOMCRDPFHP7kDhHh2_pisQsinFE1IM1Z271xaoyJH7jV35bA74fMwLcUfWsSdgFdwKT53RODgvcQO5pShzV5PBQDTggbDdgehLa9lQf-JkVntlRlEcTNea8RVQpcldvQlYMOuIOnPMijgG077j4FHWz0OdkTr7bTjMNiUlsdpTQQ26IYV1mMtsjWCQUXtnrpiw7AzXkgFaWvHdmS5C23rIXX4mzjo6hQ_-Q1ixYS7eXoNMkxFxfaYxRH8qbTnXkgZNumpDP5iBZ4zhWFe9ICHXeCmG3xOP2RPx0tFuSd59Cdl17QE__0VCuc9ecC5hF1YBRRbV9nRifkm_LuL5FdNGjL5nCnQVwyyFb1hYc6btnvsrDZeRQ5YUvhiZowgUM8BUO68Ee7QMTvZF1bmg6Rabx8tW1vI94X9FdyqiPxHaAsZ2Kgq5ng5ihG7SU_vn55SyrsafW4ublP4aGK8G2bNGVzsiyT14jk_wDRb-5yfaV8FJXZE4sWL_if_n7LrSW07N_qCAsVHBIQDinRmx4iOa9GxDGBQGnpp0mh2ui9N1Tpf174w4vcmCvsyZOSJhUhIGwptSffWrvMG5p2A7lZVGDHJvQb_QQOoE6J9YPuClF_GuRBZcTlJXPhjcasGeNUFYtWxO8TiBwXXG1nTrIVneSkRYEfoz5fTBN2hoMg"
        id="show-modal"
        @click="showModal = true" />
      </div>
      <div class="right">
        <div class="header">{{ data?.name }}</div>

        <h2>О персоне:</h2>
        <div class="about">
          <div>Карьера:</div>
          <div class="proff vv">
            <div class="item" v-for="item of kek">{{ item }}</div>
          </div>

          <div class="height">Рост:</div>
          <div>{{ height }}</div>

          <div class="">Дата рождения:</div>
          <div>{{ date.slice(0, 10) }}</div>

          <div class="">Место рождения:</div>
          <div class="proff">
            <div class="item" v-for="item of Place">{{ item }}</div>
          </div>

          <div class="">Дата смерти:</div>
          <div>{{ datePlace.slice(0, 10) }}{{ ',  ' + diff }}</div>
        </div>
      </div>
    </div>
    <h2 style="width: 60%">Интересные факты:</h2>
    <div class="bottom">
      <div class="bottom__left">
        <div>
          <ul v-for="item of desc">
            <li>{{ item }}</li>
            <el-divider />
          </ul>
        </div>
      </div>
      <div class="bottom__right"></div>
    </div>

    <div class="modalka">
      <!-- <img
        class="imgAward"
        src="https://www.kinopoisk.ru/1z49p2P01/284533PN6/_NMYuZOQBnU1Y1ryuNOiQLSV7KFJg210-gwtDiSdU2fUa0vNweYVoHIHe_x9IbFYFAJ2W1aBRsdrbnVkPWGbO8n2FJyr7AdtIHI-ruHjhxHE6MHlENYwVT7IvduQffv-RMu_JKDzCdkfbhb9dRjUVXh7f0rLLQdiWk9ldXi4x3KULx2UGijW7VUj_t4lo85YRfXEqaVPLVFiEPnTkN1v8lTnM3jIC2Cp_26yqXVM0IWZWzOul4xblmq_8XWgoHdyjJtRsOqUOp2dh1YeoSMecPHhXK1le6H1HmC1V3A9y5Y4bzP0qH8YdbuulnGluKBV8U8nCutwt8Jur-mhMNCPpsh78TCGjD6FcacG8ikDgli1RdhB9RcZHRI8CXcwXWuq2DOrXJS_BPWnGiqBISxUkTEXlzJ7gG-aVtdR0dAkO6J82_lgJnBG8SGb1m5xp1LEme3QxUkvJfVKXO17IAlX_rCDT4xg7-DlF2KOefloxL1RF_cmY9hnnqaHiWl46Pv6bDeZcKbE6n3VG8qmxdtyfF2pEJ0xT60R0uDt25TdByLUf3Mo4DNANSPuuhlhaGTRWVsLxqe45y6-B60l9AgD-uCjxTjOzEJF5f-Wkl0_9gSZKaixYY-RTVLkUVf8SSdiLMfLTHi7dKW3knIV-bT4vbWrJ4Yj4N8u9u9h3Sh4gz4wx2GY4pSKPYkT-o6l-17o1R2wFS0nsVlidIEfCGUbivTbKwhA-9j9v2qS3bGIeNEBXwP2azDPcvo3pVloJBfKTCOdEIrgjrWR_9p6yW-qkOF1mEVJC8V1nlSly8DZdyZU90-gyEsUteselgF5xNy96QcvhuNUqwKeEzk1cBj_OrCfTXDieLplVRO2nhUj1px1NTD9fb-9MZI4tecEiXMGzINTRGTz5N0TZmZhHajUuZknc5rTRNcK2ktlHeiYA_6gj-1YMjRmFdH3ShZ9I34EwW0kFX0fIdWWPKE7iMFLLsADCwAw7zStN176ba346LVxyzs6Y3TXDg5nVeEg1M-SpJdpxMZ0uul5ex7mHWeS5Gm9uIVtH1m5YlSdj1yZS7pc34cwGCsYee_qZsmVBDjFZfubNocwi-YS3_HxjDT_CuA3yTQigD5tdav-vnEnVpSlHbwhSZutdeqMHevw3cuqBBNzALS_7L13fg4BJcTY-dkDK4ojTLuutoP5vUyol46Es_Ec-sRe5fmH_vLRg7pk1b28uaUD7XXGXKFT0MkfZkB3K4ycBxC1i3aaSbGUpKXRZ38Wq7g74m6bVWVM8E_6_At9RO74Oqkt056GFdem-FWhqJUxj-0p-gyNTzRdfyLY26-8xJ9wTb9-gvl5MGSFfYdzQu_UV2qqx1kpZKAzfgyXZfRGfEL9qY8Wsnm_EthRoZj1bQsZNZa4ecssLRea1Ht_DPiX8FX_BpaZhfiwxXGnPyqP1O_2Jp-Jrbj8e-4Iu-EYkmAGhZk7Nm7l_34YYZGAReFDZc0K8FHPiNGnPkAb8wTgq0iFf9qyCXXA6IW1_6-Oo4wvbgY3-bXI5O-aKCPdmMq0xqFRjzoGucMKxO0dXMHVDzURSviZb5A9LxI0Cycw0MuwiQcqfgU5_ESFcVt71mc0HwpyQ21lVOTH_nhXRUjGMModZXvunuEv3mjRJZQ5-ZdJLQrQqXd41WPquP-vQLx_bMl3xhbR5cRs-Q37I9a7iBPutscZPQgs__b8S8GEnqjCPQ1XagLNV4Y4JeEE_eH7IbWKsPnjvEETbswzo8BUe4itE4IWmRnEFA01G3Myrzhbxq67ecXQcA-uxNfF3A5gWnUpl87eeXsuyN1JQGHV90F9WpQZC7ShF3bcN8eYZJ8w1b-KfmHl7CwN_VsDAn94z4aq52mdUJxnhjgPFVwmPJYBeXN2FrnvSghx-cS53Yc5HU48nY-UsSMGfA_DVCSnCAEDgv4NlZz4EWlPOwIbWGfKNm8FYWTsGwLkI_0ENgA6ZRmb2qaxdzrMXTkkdU3HTbkSYB17OLUbLlgTQ_QoKxx1Y_rOzSE8aH0x53te8-Snaro7mUFc_BcKYAsFcEr4KpFRO7pmQe_WBF2RWB2Zs-EtBhiJj5TlG7K451MIUCNIqZcWjhlxMDBVXY8DOl-0M2oiawFxpITvQvxbSXy2BAadhXdiltnHxtg18VAhbb8Z1aZQEZuw6eNWeFMzEBQPTG13ikal_YB0OXGPJ8KTOBuKms_RRQw0Z_I0p31EorjeZdWvwoox31qMwZWY4XW3KUECEN1_RMXzVuy3E9TQozxJ4-LmdRF8OIXly2OCe9TjDuoDPTmoVOMCRDPFHP7kDhHh2_pisQsinFE1IM1Z271xaoyJH7jV35bA74fMwLcUfWsSdgFdwKT53RODgvcQO5pShzV5PBQDTggbDdgehLa9lQf-JkVntlRlEcTNea8RVQpcldvQlYMOuIOnPMijgG077j4FHWz0OdkTr7bTjMNiUlsdpTQQ26IYV1mMtsjWCQUXtnrpiw7AzXkgFaWvHdmS5C23rIXX4mzjo6hQ_-Q1ixYS7eXoNMkxFxfaYxRH8qbTnXkgZNumpDP5iBZ4zhWFe9ICHXeCmG3xOP2RPx0tFuSd59Cdl17QE__0VCuc9ecC5hF1YBRRbV9nRifkm_LuL5FdNGjL5nCnQVwyyFb1hYc6btnvsrDZeRQ5YUvhiZowgUM8BUO68Ee7QMTvZF1bmg6Rabx8tW1vI94X9FdyqiPxHaAsZ2Kgq5ng5ihG7SU_vn55SyrsafW4ublP4aGK8G2bNGVzsiyT14jk_wDRb-5yfaV8FJXZE4sWL_if_n7LrSW07N_qCAsVHBIQDinRmx4iOa9GxDGBQGnpp0mh2ui9N1Tpf174w4vcmCvsyZOSJhUhIGwptSffWrvMG5p2A7lZVGDHJvQb_QQOoE6J9YPuClF_GuRBZcTlJXPhjcasGeNUFYtWxO8TiBwXXG1nTrIVneSkRYEfoz5fTBN2hoMg"
        id="show-modal"
        @click="showModal = true" /> -->
      <Teleport to="body">
        <ModalComponent :idz="id" :show="showModal" @close="showModal = false" />
      </Teleport>
    </div>
  </div>
  <div v-else-if="isLoading">Загрузка...</div>
</template>

<style scoped>
.main {
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
.left{
  position: relative;
}
.bottom {
  margin-top: 3px;
  width: 60%;
  /* display: grid;
  grid-template-columns: 70% 30%; */
}
.header {
  font-size: 42px;
  font-weight: 800;
}
.about {
  display: grid;
  grid-template-columns: 30% 70%;
  font-size: 13px;
  grid-gap: 43px;
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
.imgAward2{
  z-index: 1000;
  position: absolute;
  left: 0;
  bottom: 10px;
  cursor: pointer;
}

@media screen and (max-width:600px){
  .containerMain{
    display: flex;
    flex-wrap: wrap;
  }
  .imageActor{
    width: 100%;
  }
  .about{
    grid-template-columns: 24% 58%;
  }
}
</style>
