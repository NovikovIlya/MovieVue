<script setup lang="ts">
const props = defineProps<{
    desc: string[]
}>()
</script>


<template>
    <h2  style="width: 60%">
        Интересные факты:
      </h2>
      <div  style="width: 60%" >
        <div >
          <div>
            <ul v-for="(item, index) in desc">
              <li v-html="item" />
              <el-divider v-if="index !== desc.length - 1" />
            </ul>
          </div>
        </div>
        <div ></div>
      </div>
      <el-divider style="width: 60%"  />
</template>



<style scoped>

</style>