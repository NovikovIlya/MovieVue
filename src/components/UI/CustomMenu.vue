<script setup lang="ts">
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex flex-wrap items-center zz">
    <el-dropdown class="sz">
      <el-button class="sz" type="primary">
        Меню<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item ><RouterLink class="td" to="/">Люди</RouterLink></el-dropdown-item>
          <el-dropdown-item ><RouterLink class="td" to="/favorite">Избранное</RouterLink></el-dropdown-item>
          <el-dropdown-item ><RouterLink class="td" to="/random">Случайная персона</RouterLink></el-dropdown-item>
          <el-dropdown-item ><RouterLink class="td" to="/allcountry">Список стран</RouterLink></el-dropdown-item>
          <el-dropdown-item ><RouterLink class="td" to="/birthday">Дни рождения</RouterLink></el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.zz {
  width: 150px;
}
.sz {
  width: 100%;
}
.td{
  text-decoration: none;
  width: 100%;
}
@media screen and (max-width: 600px) {
  .tac {
    width: 100%;
  }
}
</style>
