<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  nameActor: string;
}>();
//data
const urlValue = ref('');

// Lifecycle hooks
onMounted(()=>[
  fetchYoutube()
])

//methods
const fetchYoutube = async () => {
  let response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${props.nameActor}&type=video&key=AIzaSyC0eVRG5nSA0E-bPOjsBjq98YPeicDViSE`,
  );
  let result = await response.json();
  const altYoutubeData = result?.items?.[0].id.videoId;
  const urlYoutube = `https://www.youtube.com/embed/${altYoutubeData}`;
  urlValue.value = urlYoutube;
};
</script>

<template>
  <div class="ww">
    <div className="video-responsive">
      <iframe
         class="ww1"
        :src="urlValue"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube" />
    </div>
  </div>
</template>

<style scoped>
.ww{
    width: 60%;
}
.ww1{
    width: 100%;
    height: 450px;
}
</style>
