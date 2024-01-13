import { ref } from 'vue';

export function useValidName(name) {
  const nameEng = ref('');
  const validName = (name) => {
    switch (name) {
      case 'Буркина-Фасо':
        nameEng.value = 'Burkina Faso';
        break;
      case 'Соединённые Штаты Америки':
        nameEng.value = 'usa';
        break;
      case 'Южный Судан':
        nameEng.value = 'South Sudan';
        break;
      case 'Замбия':
        nameEng.value = 'Zambia';
        break;
      case 'Ирак':
        nameEng.value = 'Iraq';
        break;
      case 'Иран':
        nameEng.value = 'Iran';
        break;
      case 'Бельгия':
        nameEng.value = 'Belgium';
        break;
      case 'Тайвань':
        nameEng.value = 'Taiwan';
        break;
      case 'Колумбия':
        nameEng.value = 'Colombia';
        break;
      case 'Нигерия':
        nameEng.value = 'Nigeria';
        break;
      case 'Малайзия':
        nameEng.value = 'Malaysia';
        break;
      case 'Таиланд':
        nameEng.value = 'Thailand';
        break;
      case 'Судан':
        nameEng.value = 'Sudan';
        break;
      case 'Сомали':
        nameEng.value = 'Somalia';
        break;
      case 'Малави':
        nameEng.value = 'Malawi';
        break;
      case 'Сирия':
        nameEng.value = 'Syria';
        break;
      case 'Сенегал':
        nameEng.value = 'Senegal';
        break;
      case 'Северная Корея':
        nameEng.value = 'North Korea';
        break;
      case 'Саудовская Аравия':
        nameEng.value = 'Saudi Arabia';
        break;
      case 'Казахстан':
        nameEng.value = 'Kazakhstan';
        break;
      case 'Португалия':
        nameEng.value = 'Portugal';
        break;
      case 'Перу':
        nameEng.value = 'Peru';
        break;
      case 'Мьянма':
        nameEng.value = 'Myanmar';
        break;
      case 'Мали':
        nameEng.value = 'Mali';
        break;
      case 'Кения':
        nameEng.value = 'Kenya';
        break;
      case 'Куба':
        nameEng.value = 'Cuba';
        break;
      case 'Йемен':
        nameEng.value = 'Yemen';
        break;
      case 'Южная Африка':
        nameEng.value = 'South Africa';
        break;
      case 'Доминиканская Республика':
        nameEng.value = 'Dominican Republic';
        break;
      case 'Танзания':
        nameEng.value = 'Tanzania';
        break;
      case 'Узбекистан':
        nameEng.value = 'Uzbekistan';
        break;
      case 'Чад':
        nameEng.value = 'Chad';
        break;
      case 'США':
        nameEng.value = 'usa';
        break;
      case 'Филиппины':
        nameEng.value = 'Philippines';
        break;
      case 'Эквадор':
        nameEng.value = 'Ecuador';
        break;
      case 'Шри-Ланка':
        nameEng.value = 'Sri Lanka';
        break;
      case 'Эфиопия':
        nameEng.value = 'Ethiopia';
        break;
      case 'Непал':
        nameEng.value = 'Nepal';
        break;
      case 'Демократическая Республика Конго':
        nameEng.value = 'DR Congo';
        break;
      case 'Бангладеш':
        nameEng.value = 'Bangladesh';
        break;
      case 'Кот-д’Ивуар':
        nameEng.value = 'Ivory Coast';
        break;
      case 'Зимбабве':
        nameEng.value = 'Zimbabwe';
        break;
      case 'Камерун':
        nameEng.value = 'Cameroon';
        break;
      case 'СССР':
        nameEng.value = 'russia';
        break;
      case 'Великобритания':
        nameEng.value = 'britain';
        break;
      case 'Франция':
        nameEng.value = 'france';
        break;
      case 'Испания':
        nameEng.value = 'spain';
        break;
      case 'Германия':
        nameEng.value = 'germany';
        break;
      case 'Япония':
        nameEng.value = 'japan';
        break;
      case 'Китай':
        nameEng.value = 'china';
        break;
      case 'Россия':
        nameEng.value = 'russia';
        break;
      case 'Канада':
        nameEng.value = 'canada';
        break;
      case 'Италия':
        nameEng.value = 'italy';
        break;
      case 'Мексика':
        nameEng.value = 'mexico';
        break;
      case 'Индия':
        nameEng.value = 'india';
        break;
      case 'Корея':
        nameEng.value = 'korea';
        break;
      case 'Китаиская Республика':
        nameEng.value = 'china';
        break;
      case 'Турция':
        nameEng.value = 'turkey';
        break;
      case 'Польша':
        nameEng.value = 'poland';
        break;
      case 'Греция':
        nameEng.value = 'greece';
        break;
      case 'Беларусь':
        nameEng.value = 'belarus';
        break;
      case 'Австралия':
        nameEng.value = 'australia';
        break;
      case 'Азербайджан':
        nameEng.value = 'azerbaijan';
        break;
      case 'Англия':
        nameEng.value = 'england';
        break;
      case 'Армения':
        nameEng.value = 'armenia';
        break;
      case 'Австрия':
        nameEng.value = 'austria';
        break;
      case 'Болгария':
        nameEng.value = 'bulgaria';
        break;
      case 'Бразилия':
        nameEng.value = 'brazil';
        break;
      case 'Венгрия':
        nameEng.value = 'hungary';
        break;
      case 'Великобритания':
        nameEng.value = 'britain';
        break;
      case 'Венесуэла':
        nameEng.value = 'venezuela';
        break;
      case 'Вьетнам':
        nameEng.value = 'vietnam';
        break;
      case 'Грузия':
        nameEng.value = 'georgia';
        break;
      case 'Дания':
        nameEng.value = 'denmark';
        break;
      case 'Египет':
        nameEng.value = 'egypt';
        break;
      case 'Израиль':
        nameEng.value = 'israel';
        break;
      case 'Индонезия':
        nameEng.value = 'indonesia';
        break;
      case 'Иордания':
        nameEng.value = 'jordan';
        break;
      case 'Нигер':
        nameEng.value = 'nigeria';
        break;
      case 'Нидерланды':
        nameEng.value = 'netherlands';
        break;
      case 'Норвегия':
        nameEng.value = 'norway';
        break;
      case 'Пакистан':
        nameEng.value = 'pakistan';
        break;
      case 'Румыния':
        nameEng.value = 'romania';
        break;
      case 'Сингапур':
        nameEng.value = 'singapore';
        break;
      case 'Словакия':
        nameEng.value = 'slovakia';
        break;
      case 'Словения':
        nameEng.value = 'slovenia';
        break;
      case 'Тайвань':
        nameEng.value = 'taiwan';
        break;
      case 'Тунис':
        nameEng.value = 'tunisia';
        break;
      case 'Уганда':
        nameEng.value = 'uganda';
        break;
      case 'Украина':
        nameEng.value = 'ukraine';
        break;
      case 'Финляндия':
        nameEng.value = 'finland';
        break;
      case 'Хорватия':
        nameEng.value = 'croatia';
        break;
      case 'Чехия':
        nameEng.value = 'czech';
        break;
      case 'Чили':
        nameEng.value = 'chile';
        break;
      case 'Швейцария':
        nameEng.value = 'switzerland';
        break;
      case 'Швеция':
        nameEng.value = 'sweden';
        break;
      case 'Алжир':
        nameEng.value = 'algeria';
        break;
      case 'Ирландия':
        nameEng.value = 'ireland';
        break;
      case 'Афганистан':
        nameEng.value = 'afghanistan';
        break;
      case 'Антарктида':
        nameEng.value = 'antarctica';
        break;
      case 'Гайана':
        nameEng.value = 'guyana';
        break;
      case 'Камбоджа':
        nameEng.value = 'cambodia';
        break;
      case 'Катар':
        nameEng.value = 'qatar';
        break;
      case 'Кувейт':
        nameEng.value = 'kuwait';
        break;
      case 'Ливия':
        nameEng.value = 'libya';
        break;
      case 'Мавритания':
        nameEng.value = 'mauritania';
        break;
      case 'Марокко':
        nameEng.value = 'morocco';
        break;
      case 'Монголия':
        nameEng.value = 'mongolia';
        break;
      case 'Мозамбик':
        nameEng.value = 'mozambique';
        break;
      case 'Андорра':
        nameEng.value = 'andorra';
        break;
      case 'Аргентина':
        nameEng.value = 'argentina ';
        break;
      case 'Аландские острова':
        nameEng.value = 'aland ';
        break;
      case 'Албания':
        nameEng.value = 'albania ';
        break;
      case 'Американские Самоа':
        nameEng.value = 'american samoans';
        break;
      case 'Ангилья':
        nameEng.value = 'Anguilla';
        break;
      case 'Ангола':
        nameEng.value = 'Angola';
        break;
      case 'Антигуа и Барбуда':
        nameEng.value = 'Antigua and Barbuda';
        break;
      case 'Аруба':
        nameEng.value = 'Aruba';
        break;
      case 'Багамские Острова':
        nameEng.value = 'Bahamas';
        break;
      case 'Бахрейн':
        nameEng.value = 'Bahrain';
        break;
      case 'Белиз':
        nameEng.value = 'Belize';
        break;
      case 'Бенин':
        nameEng.value = 'Bénin';
        break;
      case 'Бермудские Острова':
        nameEng.value = 'Bermuda';
        break;
      case 'Ямайка':
        nameEng.value = 'Jamaica';
        break;
      case 'Босния и Герцеговина':
        nameEng.value = 'bosnia-and-herzegovina';
        break;
      case 'Ботсвана':
        nameEng.value = 'botswana';
        break;
      case 'Бразилия':
        nameEng.value = 'brazil';
        break;
      case 'Британская территория в Индийском океане':
        nameEng.value = 'british-indian-ocean-territory';
        break;
      case 'Британские Виргинские острова':
        nameEng.value = 'british-virgin-islands';
        break;
      case 'Бруней':
        nameEng.value = 'brunei';
        break;
      case 'Буркина-Фасо':
        nameEng.value = 'burkina-faso';
        break;
      case 'Бурунди':
        nameEng.value = 'burundi';
        break;
      case 'Бутан':
        nameEng.value = 'bhutan';
        break;
      case 'Вануату':
        nameEng.value = 'vanuatu';
        break;
      case 'Ватикан':
        nameEng.value = 'vatican';
        break;
      case 'Великобритания':
        nameEng.value = 'britain';
        break;
      case 'Венгрия':
        nameEng.value = 'hungary';
        break;
      case 'Венесуэла':
        nameEng.value = 'venezuela';
        break;
      case 'Виргинские острова (США)':
        nameEng.value = 'us-virgin-islands';
        break;
      case 'Внешние малые острова (США)':
        nameEng.value = 'us-minor-outlying-islands';
        break;
      case 'Восточный Тимор':
        nameEng.value = 'east-timor';
        break;
      case 'Вьетнам':
        nameEng.value = 'vietnam';
        break;
      case 'Габон':
        nameEng.value = 'gabon';
        break;
      case 'Гаити':
        nameEng.value = 'haiti';
        break;
      case 'Гайана':
        nameEng.value = 'guyana';
        break;
      case 'Гамбия':
        nameEng.value = 'gambia';
        break;
      case 'Гана':
        nameEng.value = 'ghana';
        break;
      case 'Гваделупа':
        nameEng.value = 'guadeloupe';
        break;
      case 'Гватемала':
        nameEng.value = 'guatemala';
        break;
      case 'Гвинея':
        nameEng.value = 'guinea';
        break;
      case 'Гвинея-Бисау':
        nameEng.value = 'guinea-bissau';
        break;
      case 'Германия':
        nameEng.value = 'germany';
        break;
      case 'Гернси':
        nameEng.value = 'guernsey';
        break;
      case 'Гибралтар':
        nameEng.value = 'gibraltar';
        break;
      case 'Гондурас':
        nameEng.value = 'honduras';
        break;
      case 'Гонконг':
        nameEng.value = 'hong-kong';
        break;
      case 'Гренада':
        nameEng.value = 'grenada';
        break;
      case 'Гренландия':
        nameEng.value = 'greenland';
        break;
      case 'Южная Корея':
        nameEng.value = 'South Korea';
        break;
      case 'Босния и Герцеговина':
        nameEng.value = 'Bosnia and Herzegovina';
        break;
    }
  };

  validName(name);

  return {
    nameEng,
  };
}
