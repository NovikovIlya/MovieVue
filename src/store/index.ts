import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useMovieStore = defineStore('movieStore', () => {
    const showModal = ref(false)


    const setShowModalFalse = ()=>{
        showModal.value = false
    }

    const setShowModalTrue = ()=>{
        showModal.value = true
    }

    return{
        showModal,setShowModalFalse,setShowModalTrue
    }
})