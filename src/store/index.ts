import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useMovieStore = defineStore('movieStore', () => {
  //data
  const dataNews = ref(null)
  const showModal = ref(true);
  const dataPerson = ref([]);
  const valueSort = ref('countAwards');
  const valueSortType = ref('-1');
  const valueSortProffession = ref('Актер');
  const options = [
    {
      value: 'countAwards',
      label: 'По наградам',
    },
    {
      value: 'age',
      label: 'По возрасту',
    },
    {
      value: 'movies.rating',
      label: 'По рейтингу фильма',
    },
  ];
  const options2 = [
    {
      value: 'Актер',
      label: 'Актер',
    },
    {
      value: 'Актер дубляжа',
      label: 'Актер дубляжа',
    },
    {
      value: 'Актриса',
      label: 'Актриса',
    },
    {
      value: 'Актриса дубляжа',
      label: 'Актриса дубляжа',
    },
    {
      value: 'Звукорежиссер',
      label: 'Звукорежиссер',
    },
    {
      value: 'Композитор',
      label: 'Композитор',
    },
    {
      value: 'Монтажер',
      label: 'Монтажер',
    },
    {
      value: 'Озвучка',
      label: 'Озвучка',
    },
    {
      value: 'Оператор',
      label: 'Оператор',
    },
    {
      value: 'Переводчик',
      label: 'Переводчик',
    },
    {
      value: 'Режиссер',
      label: 'Режиссер',
    },
    {
      value: 'Сценарист',
      label: 'Сценарист',
    },
    {
      value: 'Художник',
      label: 'Художник',
    },
  ];
  const options3 = [
    {
      value: '-1',
      label: 'По убыванию',
    },
    {
      value: '1',
      label: 'По возрастанию',
    },
  ];

  //methods
  const setShowModalFalse = () => {
    showModal.value = false;
  };

  const setShowModalTrue = () => {
    showModal.value = true;
  };

  const addFavorite = (data) => {
    const per = localStorage.getItem('persons') !== null ? JSON.parse(localStorage.getItem('persons')) : [];
    dataPerson.value = Array.from(new Set([...per, data.value]));
    localStorage.setItem('persons', JSON.stringify(dataPerson.value));
  };

  const fillNews = (name)=>{
    dataNews.value = name
  }




  return {
    showModal,
    setShowModalFalse,
    setShowModalTrue,
    addFavorite,
    options,
    options2,
    options3,
    valueSort,
    valueSortType,
    valueSortProffession,

    fillNews,
    dataNews,
    
  };
});
