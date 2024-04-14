<script setup>
const props = defineProps({
  paper: Object,
  docTypeLogoPath: String
})
import router from "@/router/index.js";
import {events} from "@/bus/bus.js";
import {useReaderRequest} from "@/stores/reader.js";
const readerRequestStore = useReaderRequest();
const bus = events;

const viewPaper = (paper) => {
  //console.log("点击查看详情传进的参数", paper.id)
  let id = paper.id
  let name = paper.name
  let path = paper.url
  router.push({
    path: `/paper/${id}`,
  })

  readerRequestStore.setReaderRequest(paper)
 // bus.emit('readerRequest', {
 //   path: path,
 //   name: name
 // })
  //console.log("点击查看详情传进的参数", id, name, path)
}
</script>

<template>

  <div class="paper-outer">
    <div class="paper-main-container">
      <div class="left-logo">
        <img :src="docTypeLogoPath" alt="" style="width: 100%; ">
      </div>
      <div class="description-box">
        <p style="font-size: 1.2rem; font-weight: 600; text-align: left; overflow: hidden; white-space: nowrap; text-overflow: ellipsis">{{ paper.name }}</p>
        <ul class="mid-ul">
          <li>
            <button>2023</button>
          </li>
          <li>
            <button>精品</button>
          </li>
          <li>
            <button>真题</button>
          </li>
          <li>
            <button>答案</button>
          </li>
        </ul>

        <ul class="bottom-ul">
          <li><span style="font-size: 14px">日期</span>：&nbsp; {{ paper.upload_time }}</li>
          <li>作者：&nbsp; {{ paper.author.author }}</li>
          <li>浏览量：&nbsp; {{ paper.view_count }}</li>
          <li>下载了：&nbsp; {{ paper.download_count }}</li>
        </ul>

      </div>
      <div class="operate">
        <el-button type="primary" style="width: 100px; margin: 0" @click="viewPaper(paper)">查 看</el-button>
        <el-button type="primary" style="width: 100px; margin: 0">加入购物车</el-button>
        <p style="color: #f64d05">{{ paper.expense }}云币</p>
      </div>
    </div>
  </div>


</template>

<style scoped lang="less">

.paper-outer {
  margin-top: 0.5%;
  height: 100%;
  border: 1px solid #beb9b9;
  border-radius: 5px;
  transition-property: all;
  transition-duration: 0.3s;
  width: 80%;
  margin-left: 10%;
  // 阴影

  .paper-main-container {

    padding-top: 8px;
    display: flex;
    height: 150px;
    background-color: white;

    .left-logo {
      display: flex;
      margin-left: 20px;
      margin-right: 20px;
      height: 80%;
      width: 15%;
      background-size: 80%;
    }

    .description-box {
      width: 65%;
      height: 100%;

      .mid-ul {
        display: flex;
        width: 70%;
        justify-content: flex-start;

        li {
          margin-left: 5px;
          list-style: none;

          button {
            // 半透明
            background-color: rgba(112, 110, 110, 0.65);
            border: none;
            font-size: 1rem;
            border-radius: 4px;
            height: 100%;
          }
        }
      }

      .bottom-ul {
        margin-top: 20px;
        display: flex;

        li {
          list-style: none;
          margin-left: 20px;
        }
      }
    }

    .operate {

      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      margin-right: 20px;

      p {
        font-size: 1.3rem;
        font-weight: 600;
      }
    }
  }
}

.paper-outer:hover {
  box-shadow: 0 0 5px;
}

</style>