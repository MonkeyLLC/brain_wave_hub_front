<script setup>

defineProps({
  obj: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <el-row class="bottom-2">
    <el-col :span="24">
      <div class="grid-content ep-bg-purple-dark">

        <ul v-for="(item) in obj.select">
          {{ item.key }}：
          <li v-for="one in item.list" :key="one">
            {{ one }}
          </li>
        </ul>

      </div>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.bottom-2 {
  height: 50%;

  ul {
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;

    li {
      list-style: none;
      font-size: 14px;
      text-align: center;
      margin-right: 8px;
      color: rgb(112, 110, 110);
    }
  }
}
</style>