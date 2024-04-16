<script setup>

import AsideContainer from '@/views/Home/components/AsideContaniner.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import PaperItem from '@/views/Home/components/PaperItem.vue';
import {hot, recordSearch, getSearchList} from "@/apis/history.js";
import {getTotal, getSearchResult} from "@/apis/search.js";
import {isCollect} from "@/apis/collect.js";
import {ref, onMounted} from 'vue';
import router from "@/router/index.js";
import {useTransition} from '@vueuse/core'
import HeaderComponent from "@/views/Home/components/HeaderComponent.vue";


const query = ref('')

const isHistoryShow = ref(false)

const advImgs = ref([
  "https://img.zxxk.com/operation/2024011917546680.pn…version-code=270e7064-077d-48c5-a8db-97867aa2e8df",
  "https://img.zxxk.com/operation/2024030717192480.png",
  "https://img.zxxk.com/operation/2024031413430020.png",
  "https://img.zxxk.com/operation/2024011917546680.png?version-code=270e7064-077d-48c5-a8db-97867aa2e8df"
])

const searchResult = ref({})
const searchTotal = ref(0)
const paperList = ref([])
const total = ref(0)
const getTotalData = async () => {
  const res = await getTotal()
  total.value = res.data
}
const getHotData = async () => {
  const res = await getSearchResult()
  searchResult.value = res.data
  searchTotal.value = res.data.total
  paperList.value = res.data.hits
  const isCollectedMap = await isCollected()
  console.log("isCollectedMap", isCollectedMap)

  paperList.value.forEach((item, index) => {

    item.isCollected = isCollectedMap[item.id]

  })
}

onMounted(() => {
  searchHistoryList()
  getHotQuery()
  getTotalData()
  getHotData()

  restaurants.value = searchHistoryItems

})
const putToSearchResult = (query) => {
  record(query)
  router.push({
    name: 'result',
    query: {query: query}
  })
}

const docTypes = ref([
  'src/assets/WORD.svg',
  'src/assets/PDF.svg',
  'src/assets/PPT.svg',
  'src/assets/压缩包.svg',
  //'https://zhiyun-resource-service.oss-cn-beijing.aliyuncs.com/979017f6aa873b299bace98df0014cd5.svg',
  //'https://zhiyun-resource-service.oss-cn-beijing.aliyuncs.com/84a456f177096666f143b8b1b7126383.svg',
  //'https://zhiyun-resource-service.oss-cn-beijing.aliyuncs.com/3ed1611b9955dd41187c1744497141bd.svg',
  //'https://zhiyun-resource-service.oss-cn-beijing.aliyuncs.com/06583b8d3a2c0bf89621b4f852063401.svg'
])

const docTypeLogoPath = (paper) => {
  const index = paper.doc_type
  let docTypeLogoPath = '';
  docTypeLogoPath = docTypes.value[index - 1];
  return docTypeLogoPath;
}


const source = ref(0)
source.value = 39
const getOutputValue = () => {
  return source.value
}


const userCount = ref(0)
const outPutUser = useTransition(userCount, {
  duration: 1500,
})
userCount.value = 5211

const outPutTotal = useTransition(total, {
  duration: 1500,
})

const addResource = ref(0)
const outputAddResource = useTransition(addResource, {
  duration: 1500,
})
addResource.value = 998

const accessCount = ref(0)
const outputAccessCount = useTransition(accessCount, {
  duration: 1500,
})
accessCount.value = 8854


const state1 = ref('')
const state2 = ref('')
const restaurants = ref([])

const querySearch = (queryString, cb) => {
  const results = queryString
      ? restaurants.value.filter(createFilter(queryString))
      : restaurants.value
  // call callback function to return suggestions
  cb(results)
}

const createFilter = (queryString) => {
  return (restaurant) => {
    return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}


const handleSelect = (item) => {
  putToSearchResult(item.value)
  console.log(item)
}

/*onMounted(() => {

})*/

const isShow = ref(false)

const getIsLogin = (sonData) => {
  console.log("接收到的sonData", sonData)
  isShow.value = sonData
}

const setIsShow = () => {
  isShow.value = false
}

const record = async (query) => {
  await recordSearch(query)
}

const hotQuery = ref([])

const getHotQuery = async () => {
  const res = await hot()
  hotQuery.value = res.data
  //console.log("热门下载", res.data)
}
let searchHistoryItems = []
const searchHistoryItem = ref({})
const searchHistoryList = async () => {
  const res = await getSearchList()

  res.data.items.slice(0, 5).forEach(item => {
    let i = {
      value: item
    }
    searchHistoryItems.push(i)

  })

  return searchHistoryItems
}

// 取到searchHistoryItems的中每一个元素的集合
const isCollected = async () => {
  let paperIds = []
  paperList.value.forEach(item => {
    paperIds.push(item.id)
  })
  const res = await isCollect(paperIds)
  console.log("res", res.data)
  return res.data

  //console.log("paperIds", paperIds)
}


</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-container" height="100">
        <!--        <header-container></header-container>-->
        <header-component @isShowLogin="getIsLogin">
          <template #content>
            <div class="nav">
              <ul>
                <li>帮助中心</li>
                <li>联系我们</li>
                <li>校网通入口</li>
              </ul>
            </div>
          </template>
        </header-component>
      </el-header>
      <el-container style="margin-top: 50px">
        <login-component :is-show="isShow" @close="setIsShow"></login-component>
        <el-aside width="20%" class="aside-container">
          <AsideContainer></AsideContainer>
        </el-aside>
        <el-container class="main-wrapper">
          <el-main class="main-container">
            <div class="home-main-content-top-container">
              <div class="description-box"
                   style="color: white; font-size: 30px; font-weight: 600; word-break: break-word">
                <br>
                <p>
                  Brain Wave Hub
                </p>
                <p> 一站式教育资源共享平台</p>
              </div>
              <div class="home-main-content-top">
                <!--                <el-input v-model="query" placeholder="请输入关键词" @focus="isHistoryShow = true"
                                          @blur="isHistoryShow=false"></el-input> -->

                <div style="width: 100%">
                  <div>
                    <el-autocomplete
                        v-model="query"
                        :fetch-suggestions="querySearch"
                        clearable
                        class="inline-input w-50"
                        placeholder="Please Input"
                        @select="handleSelect"
                    />
                    <el-button @click="putToSearchResult(query)"><i style="transform: scale(1.5)"
                                                                    class="iconfont icon-sousuo"></i></el-button>
                  </div>

                  <div class="hot">

                    <ul>
                      <span style="color: #f1ecec">热门搜索：</span>
                      <li v-for="item in hotQuery" :key="item" @click="putToSearchResult(item)">
                        {{ item }}
                      </li>
                    </ul>

                  </div>

                </div>


                <div class="history-search-box" v-show="isHistoryShow" @focus="isHistoryShow=true">
                  <ul>
                    <span style="font-size: 14px; color: darkgray">历史记录</span>

                    <li>初一上册数学</li>
                    <li>高一期末复习</li>
                    <li>高二英语期中</li>
                    <li>六年级语文</li>
                  </ul>
                </div>
              </div>
              <div class="right-box">
                <div class="nav-list">
                  <div class="nav">

                    <button class="nav-bt">
                      <i class="iconfont icon-shangchuan"></i><span>上传</span>
                    </button>
                  </div>

                  <div class="nav" style="margin-top: 30px">
                    <button class="nav-bt">
                      <i class="iconfont icon-huiyuan"></i><span>会员</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>
            <div class="home-main-content-container">
              <div class="count_adv_box">
                <div class="count_box_outer">
                  <div class="count_box">
                    <ul>
                      <li>
                        <div>
                          <img src="@/assets/资源.svg" alt="">
                          <div class="text_box">
                            <div style="padding-bottom: 8px; padding-top: 8px">
                              <el-statistic title=" 收录资源总量：" :value="outPutTotal"/>
                              <!--                              <span style="color: rgba(234,66,0,0.72);">{{ total }}</span>-->
                            </div>
                          </div>
                        </div>

                      </li>
                      <li>
                        <div>
                          <img src="@/assets/更新.svg" alt="">
                          <div class="text_box">
                            <div style="padding-bottom: 8px; padding-top: 8px">
                              <el-statistic title=" 近一周更新量：" :value="outputAddResource"/>
                              <!--<span style="color: rgba(234,66,0,0.72);"></span>-->
                            </div>

                          </div>
                        </div>
                      </li>
                      <li>
                        <div>
                          <img src="@/assets/平台用户数.svg" alt="">
                          <div class="text_box">
                            <div style="padding-bottom: 8px; padding-top: 8px">
                              <el-statistic title=" 平台用户总数：" :value="outPutUser"/>
                              <!--                              平台用户总数：<span style="color: rgba(234,66,0,0.72);">5211</span>-->
                            </div>

                          </div>
                        </div>
                      </li>
                      <li>
                        <div>
                          <img src="@/assets/访问量.svg" alt="">
                          <div class="text_box">
                            <div style="padding-bottom: 8px; padding-top: 8px">
                              <el-statistic title=" 平台月访问量：" :value="outputAccessCount"/>
                              <!--                              平台月访问量：<span style="color: rgba(234,66,0,0.72);">88541</span>-->
                            </div>

                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="adv_box_outer">
                  <div class="adv_box">
                    <div class="block text-center">
                      <el-carousel height="420px" motion-blur>
                        <el-carousel-item v-for="item in advImgs" :key="item"
                                          :style="{ 'background': 'url(' + item + ') no-repeat'}">
                          <h3 class="small justify-center" text="2xl"
                          >
                          </h3>
                        </el-carousel-item>
                      </el-carousel>
                    </div>

                  </div>
                </div>

              </div>
              <div class="hot-paper">
                <img src="@/assets/热门.svg" alt="" style="height: 50%">
                热门下载
              </div>
              <div class="paper-list-container" v-for="(paper,index) in paperList" :key="index">
                <paper-item :paper="paper" :docTypeLogoPath="docTypeLogoPath(paper)"></paper-item>
              </div>
            </div>

          </el-main>
          <el-footer height="150px">

            <footer-component></footer-component>

          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
/deep/ .el-footer {
  width: 100%;
  margin-bottom: 5%;
}

.main-wrapper {
  flex: 1;
  /* 让 main-wrapper 充满剩余的空间 */
  display: flex;
  justify-content: center;
  /* 在主轴上居中 */
  align-items: center;
  /* 在交叉轴上居中 */
}

.main-container {
  width: 100%;

  .home-main-content-top-container {

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .description-box {
      text-align: center;
      width: 20%;
      height: 100%;
    }

    height: 300px;
    background: url("https://sciradar.com/static/img/dashboard/index-open-bg.webp") no-repeat;
    background-size: 100%;

    .home-main-content-top {

      .hot {
        ul {
          display: flex;

          li {
            color: white;
            list-style: none;
            margin: 0 10px;
            font-weight: 600;
            cursor: pointer;
          }
        }
      }

      width: 50%;

      .history-search-box {
        background-color: #ffffff;
        width: 40%;
        position: absolute;
        top: 47px;
        right: 32%;
        border-radius: 20px;

        ul {
          li {
            list-style: none;
            margin-top: 10px;
            font-size: 15px;
          }
        }
      }

      display: flex;
      justify-content: center;

      .el-button {


        height: 50px;
        line-height: 42px;
      }

      /deep/ .el-autocomplete {
        .el-input {
          height: 50px;
        }

        width: 70%;

      }

      /*/deep/ .el-input {
        width: 40%;
      }

      /deep/ .el-input__wrapper {
        border: none;
        line-height: 80px;
        border-radius: 55px;
        padding-left: 20px;
        height: 40px;
      }*/

      /deep/ .is-focus {
        box-shadow: none;
      }


      /deep/ .el-input__inner { //改文字
        font-size: 1rem;
        color: #333;
        font-weight: 600;
      }
    }

    .right-box {
      .nav-list {

      }

      .nav {
        line-height: 43px;
        height: 100%;
        width: 100%;

        .nav-bt {
          padding: 8px 30px;
          text-align: center;
          font-size: 1.1rem;
          border-radius: 20px;

          span {
            margin-left: 20px;
          }

          cursor: pointer;
        }

        .nav-bt:active {
          /* 过渡放大*/
          transform: scale(1.1);
          transition-duration: 0.1s;

        }


        /deep/ .select-button:hover {
          background-color: rgba(190, 185, 185, 0.29);
        }
      }
    }
  }

  .home-main-content-container {
    margin-top: 20px;
    background-color: #f2f2f2;
    width: 100%;

    .count_adv_box {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .count_box_outer {
        width: 45%;
        margin-bottom: 5%;

        .count_box {
          background-color: white;
          margin-top: 5%;
          border-radius: 10px;
          margin-left: 5%;
          height: 100%;
          padding-top: 5%;

          img {
            width: 60%;
            height: 60%;
          }

          .text_box {
            background-color: rgba(93, 89, 89, 0.16);
            width: 100%;

            text-align: center;

            border-radius: 10px;

            p {
              margin-top: 8px;
            }
          }

          ul {
            padding: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100%;
            height: 100%;
            margin: 0;

            li {
              list-style: none;
              font-size: 1rem;
              font-weight: 600;
              width: 100%;
              height: 100%;
              text-align: center;
              line-height: 100%;
              display: flex;
              flex-direction: column;
            }
          }
        }
      }

      .adv_box_outer {
        width: 50%;
        display: flex;

        .adv_box {
          margin-top: 10%;
          height: 100%;
          width: 100%;
          margin-right: 5%;

          .demonstration {
            color: var(--el-text-color-secondary);
          }

          el-carousel-item {
            width: 100%; /* 确保容器宽度与 el-carousel-item 一致 */
            height: 100%; /* 确保容器高度与 el-carousel-item 一致 */
            background-size: cover; /* 让背景图片尽可能填充整个容器 */
            background-repeat: no-repeat; /* 防止背景图片重复 */
          }

          .el-carousel__item h3 {
            color: #475669;
            opacity: 0.75;
            line-height: 200px;
            margin: 0;
            text-align: center;
          }

          .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
          }

          .el-carousel__item:nth-child(2n + 1) {
            background-color: #d3dce6;
          }
        }
      }


    }

    .hot-paper {
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
    }
  }
}

.header-container {
  height: 100px;
  background-color: #B3C0D1;

  align-items: center;

  .nav {
    ul {
      display: flex;
      list-style: none;
      color: black;
      width: 300px;
      justify-content: space-evenly;
    }


  }
}

.aside-container {
  display: flex;
}
</style>
