<template>
  <LoginIndex :isShow="isShow"></LoginIndex>

  <!--   <el-button type="primary" @click="changeShow">Primary</el-button> -->

<!--  <home-index></home-index>-->

  <router-view></router-view>
  <!--  <search-result-index></search-result-index>-->
</template>

<script setup>

import LoginIndex from '@/components/Login/LoginIndex.vue';
/*import HomeIndex from '@/views/Home/HomeIndex.vue';*/

import { ref } from 'vue';
import SearchResultIndex from "@/views/SearchResult/SearchResultIndex.vue";
const isShow = ref(false)
const changeShow = () => {
  isShow.value = !isShow.value
  console.log(isShow.value)
}
</script>

<style lang="less" >
 @import url('//at.alicdn.com/t/c/font_4450034_1o4gya2jeds.css');
</style>