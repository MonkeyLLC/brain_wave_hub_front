<script setup>
import {ref, onMounted} from 'vue';
const currentPage = ref(1)
const total = ref(100)

const paperList = [
    '期末检测卷- 2023-2024学年七年级上册初一数学同步作业（湘教版）',
    '第5章 相交线与平行线- 2023-2024学年七年级上册初一数学同步训练方案（华东师大版）',
    '重庆十八中两江实验中学校2023-2024学年高一上学期期中质量监测历史试卷(无答案)'
]
</script>
<template>

  <el-container>
    <el-main class="my-upload-main-outer-box">
      <!--      <div class="content">

              <el-row>

                <el-col :span="24">
                  <div class="col">

                    <table style="width: 100%;margin-top: 2%">
                      <tr>
                        <th class="th-left">资源</th>
                        <th class="th-right">状态</th>
                      </tr>
                      <tr v-for="item in 10" class="collect-tr" v-if="tableData.length>=1">
                        <td class="td-right">
                          <div class="suggest-body">
                            <img src="/src/assets/WORD1.svg" alt="">
                            <span
                                @click="putToPaperDetail(item.paperId)">
                               湖南人文科技
                            </span>
                          </div>
                        </td>
                        <td class="td-left">&lt;!&ndash;{{ item.date }}&ndash;&gt;
                          <button class="td-left-bt" style="margin-right: 15px" @click="downloadHandler(item.paperId)">下载</button>
                          <button class="td-left-bt" @click="cancelCollected(item.paperId)">移出</button>
                        </td>
                      </tr>
                      <el-empty description="description" v-else/>
                    </table>

                    <div class="col-bottom" v-if="tableData.length>=1">
                      <el-pagination background layout="prev, pager, next" :total="total" v-model:current-page="currentPage"/>
                    </div>
                  </div>
                </el-col>

              </el-row>

            </div>-->
      <div class="my-upload-main">
        <table class="my-upload-table">
          <tr>
            <th>资源</th>
            <th>状态</th>
          </tr>
          <tr v-for="item in paperList" :key="item">
            <td class="my-upload-table-td-left">
              <div style="display: flex; align-items: center;margin-left: 8%">
                <img src="../../assets/PDF.svg" alt="">
                <span>{{item}}</span>
              </div>
            </td>
            <td class="my-upload-table-td-right">
              <p>审核中</p>
            </td>
          </tr>
        </table>
        <div class="col-bottom">
          <el-pagination background layout="prev, pager, next" :total="paperList.length" v-model:current-page="currentPage"/>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<style lang="less" scoped>
/*.personal-main-outer-box {

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
          span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-left: 2%;
            cursor: pointer;
          }
          span:hover {
            color: #409EFF;
          }

          margin-top: 2%;
          height: 50px;
          width: 100%;
          display: flex;
          align-items: center;
          text-align: center;

          justify-content: flex-start;

          img {
            width: 10%;
          }
        }
      }

    }
  }
}*/
.my-upload-main-outer-box {
  .my-upload-main {
    .col-bottom {
      display: flex;
      justify-content: flex-end;
      margin-top: 1%;
      border: 1px solid #ccc;
      border-radius: 20px;
      padding: 1% 2%;
    }

    .my-upload-table {

      // 最后一个tr

      width: 100%;
      padding: 2% 2%;
      // 单元格线
      border: 1px solid #ccc;
      border-radius: 20px;

      .my-upload-table-td-right {
        width: 20%;

        p {
          text-align: center;
        }
      }

      .my-upload-table-td-left {
        width: 80%;

        span {
          margin-left: 2%;
        }

        img {
          width: 5%;
        }
      }
    }
  }

}
</style>