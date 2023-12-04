import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useMovieStore = defineStore('movieStore', () => {
    const showModal = ref(false)
    const dataPerson = ref([])

    const setShowModalFalse = ()=>{
        showModal.value = false
    }

    const setShowModalTrue = ()=>{
        showModal.value = true
    }

    const addFavorite = (data) => {

        dataPerson.value = Array.from(new Set([...dataPerson.value,data.value]))
      
        localStorage.setItem('persons', JSON.stringify(dataPerson.value));
      };

    return{
        showModal,setShowModalFalse,setShowModalTrue,addFavorite
    }
})