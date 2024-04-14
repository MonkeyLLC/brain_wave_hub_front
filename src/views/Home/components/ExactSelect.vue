<script setup>
import ExactContentSelect from '@/views/Home/components/ExactContentSelect.vue';
import {ref} from 'vue';

// 复习阶段
const selectList = [
  {
    stage: '高考',
    list: ['一轮复习', '二轮专题', '三轮冲刺', '联考真题', '高考真题', '名校精品', '一模', '二模', '三模']
  },
  {
    stage: '中考',
    list: ['一轮复习1', '二轮专题1', '三轮冲刺2', '联考真题', '高考真题', '名校精品', '一模', '二模', '三模']
  }
]

defineProps({
  obj: {
    type: Object,
    required: true
  }
})

</script>


<template>
  <el-row class="top">
    <el-col :span="24">
      <div class="grid-content ep-bg-purple-dark">
        <el-row class="bottom-1">
          <el-col :span="24">
            <div class="grid-content ep-bg-purple-dark">
              <slot name="default"></slot>
            </div>
          </el-col>
        </el-row>
        <ExactContentSelect :obj></ExactContentSelect>
      </div>
    </el-col>
  </el-row>

<!--  <el-row class="medium">
    <el-col :span="24">
      <div class="grid-content ep-bg-purple-dark">
        <el-row class="bottom-1">
          <el-col :span="24">
            <div class="grid-content ep-bg-purple-dark">
              复习备考
            </div>
          </el-col>
        </el-row>

        &lt;!&ndash;这里传要放的列表进去&ndash;&gt;
        &lt;!&ndash;比如我传  高考：一模二模三模  &ndash;&gt;
        <ExactContentSelect :obj></ExactContentSelect>
      </div>
    </el-col>
  </el-row>


  <el-row>
    <el-col :span="24">
      <div class="grid-content ep-bg-purple-dark">


        <el-row class="bottom-1">
          <el-col :span="24">
            <div class="grid-content ep-bg-purple-dark">
              复习阶段
            </div>
          </el-col>
        </el-row>

        <ExactContentSelect :obj></ExactContentSelect>


      </div>
    </el-col>
  </el-row>-->

</template>

<style lang="less" scoped>

.bottom-1 {
  height: 30%;

  /deep/ .grid-content {
    min-height: 50px;
    line-height: 50px;
  }
}

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


.el-row {
  margin-bottom: 10px;
  height: 30%;
}

.el-col {
}

.grid-content {
  border-radius: 4px;
  min-height: 80px;
}


</style>
