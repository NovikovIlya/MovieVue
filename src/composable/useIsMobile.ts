import { ref } from 'vue';

export function useIsMobile() {
  const mobile = ref(false);
  const isMobile = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {

      mobile.value = true;
    } else {
     
      mobile.value = false;
    }
  };
  return {
    mobile,
    isMobile,
  };
}
