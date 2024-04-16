<script setup>
import {ref, onMounted} from 'vue';
import {getImagePaths} from '@/apis/reader.js';
import {useRoute} from "vue-router";
import {useReaderRequest} from "@/stores/reader.js";
import HeaderComponent from "@/views/Home/components/HeaderComponent.vue";
import downloadFile from '@/apis/download.js'
import {collect} from '@/apis/collect.js'
import {isCollect} from "@/apis/collect.js";
import {recordView} from "@/apis/history.js";
import {ElMessage} from "element-plus";

const readerRequestStore = useReaderRequest();

const imagePaths = ref([]);
const route = useRoute()
let id = route.params.id
const paper = readerRequestStore.paper;
console.log("paper", paper.url, paper.name)
let path = paper.url;
let name = paper.name;
const getPaperDetail = async () => {

  const res = await getImagePaths(id, {
    path: path,
    name: name
  })
  imagePaths.value = res.data;
}
onMounted(() => {
  getPaperDetail();
  isCollectHandle()
  recordView(id)
})

const input = ref('');
const circleUrl = ref("https://uat.sciradar.com/img/logo-dark.c2967aad.svg")

const isLoading = ref(true);
const imageLoaded = () => {
  isLoading.value = false;
}

const download = async () => {
  const res = await downloadFile(id)

}
const collectState = ref(false)
const collectHandle = async () => {
  await collect(id)
  if (collectState.value) {
    ElMessage({
      message: '收藏成功',
      type: 'success',
    })
  }

}
const paperIds = []
const isCollectHandle = async () => {
  paperIds.push(id)
  const res = await isCollect(paperIds)

  for (const key in res.data) {
    console.log("key", key)
    if (res.data.hasOwnProperty(key)) {
      console.log("key", key, res.data[key])
      collectState.value = res.data[key]
      // 在这里处理键值对
    }
  }

  console.log("isCollect", collectState.value)

}

const collected = () => {
  ElMessage({
    message: '已在收藏栏',
    type: 'error',
  })
}
</script>
<template>
  <!--  <img src="@/assets/data/output/54/8f083e03b181f675e03649e5e8a9ddff-1.png">-->

  <header-component></header-component>

  <div class="paper-detail-outer-box">
    <div class="paper-detail-header-box">
      <div class="description">
        <span class="title">{{ name }}</span>
        <ul>
          <li>作者：{{ paper.author.author }}</li>
          <li>下载量：{{ paper.download_count }}</li>
          <li>浏览量：{{ paper.view_count }}</li>
          <li>时间：{{ paper.upload_time }}</li>
        </ul>

      </div>
      <div class="operate">
        <button class="operate-bt" @click="download">
          <i class="iconfont icon-xiazai-"></i>
          <span>下载</span>
        </button>

        <button class="operate-bt" style="background-color: #3498db" @click="collectHandle" v-show="!collectState">
          <i class="iconfont icon-shoucang"></i>
          <span>收藏</span>
          {{ collectState }}
        </button>

        <button class="operate-bt" style="background-color: #3498db" v-show="collectState" @click="collected">
          <i class="iconfont icon-shoucang"></i>
          <span>已收藏</span>
        </button>
      </div>

    </div>
    <div class="paper-detail-main-outer-box" v-loading="isLoading">
      <div class="paper-image-outer-box">
        <div class="paper-image-inner-box">
          <img :src="path" alt="" v-for="path in imagePaths" :key="path" style="width: 100%" @load="imageLoaded">
        </div>
      </div>
      <div class="paper-recommend-box">
        <div class="suggest-header">
          <img src="@/assets/推荐.svg" alt="">
          &nbsp;
          推荐资源
        </div>
        <div class="suggest-body">
          <img src="@/assets/PDF.svg" alt="">
          <span
              style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">2023年湖南省郴州市永兴县树德中学九年级模拟考试数学试题</span>
        </div>

        <div class="suggest-body">
          <img src="@/assets/WORD.svg" alt="">
          <span
              style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">2023年湖南省郴州市永兴县树德中学九年级模拟考试数学试题</span>
        </div>

        <div class="suggest-body">
          <img src="@/assets/PPT.svg" alt="">
          <span
              style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">2023年湖南省郴州市永兴县树德中学九年级模拟考试数学试题</span>
        </div>


      </div>
    </div>
  </div>


</template>

<style lang="less" scoped>
body {
  margin: 0;
}

.paper-detail_header_container {
  height: 100px;
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  align-items: center;
  display: flex;
  justify-content: space-between;

  .el-input {
    width: 60%;
    height: 50%;
  }

  .logo {
    display: flex;
    align-items: center;
    height: 70%;

    a {
      display: block;
      margin: auto 0;
    }
  }

  .avatar {
    display: flex;
    align-items: center;
    height: 100%;

    .el-avatar {
      transform: scale(1.5);
    }
  }


}

.paper-detail-outer-box {
  margin-top: 40px;
  background-color: #f2f2f2;

  .paper-detail-header-box {
    .operate {
      margin-top: 2%;

      .operate-bt {
        padding: 10px 20px;
        border-radius: 20px;
        border: none;
        background-color: #0069ff;
        color: white;
        font-size: 1.1rem;
        margin-right: 20px;

        span {
          margin-left: 6px;
        }
      }

      .operate-bt:active {
        background-color: #0053cc;
        transition-duration: 0.1s;
        scale: 1.05;
      }
    }

    .description {
      .title {
        font-size: 1.5rem;
        font-weight: bold;
      }

      ul {
        margin: 0;
        display: flex;
        list-style: none;

        li {
          margin-top: 1%;
          margin-right: 3%;
        }

      }
    }


    margin: 0 12.5%;
    padding: 2% 0;
    display: flex;
    justify-content: space-between;
  }

  .paper-detail-main-outer-box {
    width: 100%;
    display: flex;

    .paper-image-outer-box {
      width: 60%;
      margin-left: 12.5%;

      .paper-image-inner-box {
        img {
          border-bottom: 2px solid #f2f2f2;
        }

        background-color: #ffffff;

        border: 1px solid #f2f2f2;
        padding: 2%;
        border-radius: 20px;

      }
    }

    .paper-recommend-box {
      .suggest-header {
        margin-top: 2%;
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 1.5rem;
        font-weight: 600;
        justify-content: center;
        color: #e1450f;
        background-color: rgba(224, 218, 218, 0.62);
        border-radius: 20px;

        img {
          width: 15%;
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
          width: 10%;
        }
      }

      background-color: #ffffff;
      width: 15%;
      padding: 1%;
      border-radius: 20px;
      margin-left: 1%;
    }

  }
}

</style>