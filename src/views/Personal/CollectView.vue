<script setup>

import {ref, onMounted} from 'vue';
import {collectedList} from "@/apis/collect.js";

const radio1 = ref('New York')
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const tableData = ref([])

const calcWidth = (percentage) => {
  return `calc(${percentage * 100}% - 16px)`; // 16px 为列的 padding
}

const currentPage = ref(1)
const total = ref(100)

const getCollectedList = async () => {
  const res = await collectedList(currentPage.value)
  total.value = res.data.total
  tableData.value = res.data.items
  console.log(res)
}

onMounted(() => {
  getCollectedList()
})
</script>
<template>

  <el-container>
    <el-main class="personal-main-outer-box">

      <div class="content">

        <el-row>

          <el-col :span="24">
            <div class="col">

              <table style="width: 100%;margin-top: 2%">
                <tr>
                  <th class="th-left">资源</th>
                  <th class="th-right">操作</th>
                </tr>
                <tr v-for="item in tableData" class="collect-tr" v-if="tableData.length>=1">
                  <td class="td-right">
                    <div class="suggest-body">
                      <img src="@/assets/PDF.svg" alt="">
                      <span style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; margin-left: 2%">
                        {{ item.paperName }}
                      </span>
                    </div>
                  </td>
                  <td class="td-left"><!--{{ item.date }}-->
                    <button class="td-left-bt" style="margin-right: 15px">下载</button>
                    <button class="td-left-bt">取消收藏</button>
                  </td>
                </tr>
                <el-empty description="description" v-else />
              </table>

              <div class="col-bottom" v-if="tableData.length>=1">
                <el-pagination background layout="prev, pager, next" :total="total" v-model:current-page="currentPage"/>
              </div>
            </div>
          </el-col>

        </el-row>

      </div>

    </el-main>
  </el-container>
</template>

<style lang="less" scoped>
.personal-main-outer-box {

  /deep/ .el-row {
    margin-top: 20px;
  }


  .top {
    border-bottom: 1px solid #beb9b9;
    padding-bottom: 10px;
  }

  .main {
    padding: 20px;

    width: 70%;
    margin-left: 15%;

    .select {
      display: flex;
      justify-content: center;
      width: 80%;
      margin-left: 10%;
    }

    .select {
      padding-bottom: 3%;
      padding-top: 3%;
      border-bottom: 1px solid #beb9b9;
    }

    .content {
      width: 100%;

      .col {

        .col-bottom {
          display: flex;
          justify-content: flex-end;
          margin-top: 2%;
          border-top: 1px solid #beb9b9;
          padding: 2% 2%;
        }

        border: 1px solid #beb9b9;
        border-radius: 20px;

        .th-left {
          border-bottom: 1px solid #beb9b9;
          padding-bottom: 20px;
          width: 80%;
        }

        .th-right {
          border-bottom: 1px solid #beb9b9;
          padding-bottom: 2%;
          width: 20%;
        }

        .collect-tr {

          .td-right {
            padding-left: 8%;
          }

          .td-left {
            text-align: center;

            .td-left-bt {
              // 半透明
              padding: 5px 15px;
              border: none;
              border-radius: 10px;
              cursor: pointer;
              background-color: #409EFF;
              color: white;
            }

            .td-left-bt:active {
              background-color: #3a8ee6;
              scale: 1.05;
              transition-duration: 0.1s;
            }
          }
        }


        .suggest-body {
          margin-top: 2%;
          height: 50px;
          width: 100%;
          display: flex;
          align-items: center;
          text-align: center;

          justify-content: flex-start;

          img {
            width: 5%;
          }
        }
      }

    }
  }
}
</style>