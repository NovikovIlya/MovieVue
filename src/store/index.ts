import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useMovieStore = defineStore('movieStore', () => {
  const showModal = ref(false);
  const dataPerson = ref([]);

  const setShowModalFalse = () => {
    showModal.value = false;
  };

  const setShowModalTrue = () => {
    showModal.value = true;
  };

  const addFavorite = (data) => {
    const per =
      localStorage.getItem('persons') !== null ? JSON.parse(localStorage.getItem('persons')) : [];

    dataPerson.value = Array.from(new Set([...per, data.value]));

    localStorage.setItem('persons', JSON.stringify(dataPerson.value));
  };

  return {
    showModal,
    setShowModalFalse,
    setShowModalTrue,
    addFavorite,
  };
});
