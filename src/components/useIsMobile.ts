import { ref } from 'vue';

export function useIsMobile() {
  const mobile = ref(false);
  const isMobile = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      console.log('Это тф');
      mobile.value = true;
    } else {
      console.log('Это пк');
      mobile.value = false;
    }
  };
  return {
    mobile,
    isMobile,
  };
}
