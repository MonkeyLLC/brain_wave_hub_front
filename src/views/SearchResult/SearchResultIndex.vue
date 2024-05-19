<script setup>
import {ref, onMounted} from 'vue';
import PaperItem from "@/views/Home/components/PaperItem.vue";
import {useRoute} from 'vue-router'
import {useRouter} from "vue-router";
import {getSearchResult} from "@/apis/search.js";
import HeaderComponent from "@/views/Home/components/HeaderComponent.vue";
import {isCollect} from "@/apis/collect.js";

const router = useRouter()
const handleNodeClick = (data) => {
  console.log(data);
  let select = '';
  let version = '';
  let gradeCategory = '';
  let province = '';
  let city = '';
  let scene = '';
  // 如果data.children不是undefined的话，说明点击的是父节点
  if ('children' in data) {
    select = data.label
    return
  } else {
    select = data.parent;
    console.log("点击的弗雷", select)
    if (select === '教材版本') {
      version = data.label.split(' ')[0];
      localStorage.setItem('version', version);
    } else if (select === '年级分类') {
      gradeCategory = data.label.split(' ')[0];
      localStorage.setItem('gradeCategory', gradeCategory);
    } else if (select === '省份') {
      province = data.label.split(' ')[0];
      localStorage.setItem('province', province);
    } else if (select === '城市') {
      city = data.label.split(' ')[0];
      localStorage.setItem('city', city);
    } else if (select === '适用场景') {
      scene = data.label.split(' ')[0];
      localStorage.setItem('scene', scene);
    }
  }

// 解析路由地址
  const resolvedRoute = router.resolve({
    path: '/result',
    query: {
      query: searchRequest.value.query,
      gradeCategory: gradeCategory,
      version: version,
      province: province,
      city: city,
      scene: scene
      //gradeCategory: gradeCategory
    }
  });

  // 在新窗口中打开路由
  window.open(resolvedRoute.href, '_blank');


};

const searchRequest = ref({
  query: '',
  page: 1,
  sort: '综合',
  order: 'DESC',
  gradeCategory: '',
  version: null,
  province: null,
  city: null,
  scene: null,
})

const docTypes = ref([
  'src/assets/WORD2.svg',
  'src/assets/PDF.svg',
  'src/assets/PPT.svg',
  'src/assets/压缩包.svg',
])

const docTypeLogoPath = (paper) => {
  const index = paper.doc_type
  let docTypeLogoPath = '';
  docTypeLogoPath = docTypes.value[index - 1];
  return docTypeLogoPath;
}

const paperList = ref([])
const total = ref(0)
const currentPage = ref(parseInt(localStorage.getItem('currentPage')) || 1);
const pageChane = async (page) => {

  currentPage.value = page
  searchRequest.value.page = page

  localStorage.setItem('currentPage', page);

  const res = await getSearchResult(searchRequest.value)
  paperList.value = res.data.hits

}
let aggResult = {}


let agsss = {}
const getSearchResultData = async () => {
  const route = useRoute()
  //searchRequest.value.query = route.query.query
  //searchRequest.value.gradeCategory = route.query.gradeCategory
  //searchRequest.value.version = route.query.version
  //searchRequest.value.province = route.query.province
  //searchRequest.value.city = route.query.city
  //searchRequest.value.scene = route.query.scene
  searchRequest.value.query = localStorage.getItem('query')
  searchRequest.value.gradeCategory = localStorage.getItem('gradeCategory')
  searchRequest.value.version = localStorage.getItem('version')
  searchRequest.value.province = localStorage.getItem('province')
  searchRequest.value.city = localStorage.getItem('city')
  searchRequest.value.scene = localStorage.getItem('scene')


  const res = await getSearchResult(searchRequest.value)
  paperList.value = res.data.hits
  total.value = res.data.total

  agsss = res.data.aggResult.aggs

  const isCollectedMap = await isCollected()
  paperList.value.forEach((item, index) => {

    item.isCollected = isCollectedMap[item.id]

  })
  //res.data.aggResult.aggs
  // console.log("得到的聚合对象", res.data.aggResult.aggs)


}
//console.log("最终得到的对象",objs)

const defaultProps = {
  children: 'children',
  label: 'label',
};

const isloading = ref(true)
const objs = ref([])
const fetchData = async () => {
  await getSearchResultData().then(
      () => {

        for (const [key, value] of Object.entries(agsss)) {
          let obj = {
            label: '',
            children: []
          }

          obj.label = key
          value.forEach((item) => {
            if (item.key !== null && item.key.trim() !== '') {
              obj.children.push({
                label: item.key + '  (' + item.count + ')',
                count: item.count,
                parent: key,
              })
            }

          })
          objs.value.push(obj)
          // console.log(key, value)
        }

        isloading.value = false
      }
  )

}


onMounted(() => {
  //getSearchResultData()
  fetchData()

})


function transformData(data) {
  const result = [];
  for (const [category, values] of Object.entries(data.aggs || {})) {
    const categoryItem = {
      label: category,
      children: values.map(value => ({
        label: value.key,
        count: value.count,
        children: value.children ? transformData({aggs: {[value.key]: value.children}}) : null
      }))
    };
    result.push(categoryItem);
  }
  console.log(result);
  return result;

}

//const frontendData = transformData(aggResult);


const checked1 = ref(false)

const docType = ref([''])
const categoryByDocType = ['PDF', 'WORD', 'PPT', '压缩包']
const selectedCategories = ref([])
const categoryByDocTypeValue = ref({
  'PDF': 1,
  'WORD': 2,
  'PPT': 3,
  '压缩包': 4
})
const selectDocType = (index) => {
  //searchRequest.value.docType = docType
  selectedCategories.value.push(index)
  console.log(selectedCategories.value[index])
}


const categoryByDifficulty = ['基础', '中等', '培优']
const difficulty = ref([''])

const categoryByPrice = ref(['免费', '普通', '会员'])
const price = ref([''])

const sort = ref('综合')
const sortRadioGroup = ref(['综合', '最新', '浏览', '价格', '下载'])
const order = ref('DESC')

const executeSort = async () => {

  searchRequest.value.sort = sort.value;
  searchRequest.value.order = order.value;

  console.log(searchRequest.value)
  const res = await getSearchResult(searchRequest.value)
  paperList.value = res.data.hits

  // console.log(sort.value, order.value);
};

// 点击排序按钮时调用的函数
let clickCount = 0;
const handleClickSort = (selectedSort) => {
  // console.log(selectedSort);
  sort.value = selectedSort;
  /* if (sort.value === selectedSort) {
     clickCount++; // 累加点击次数
     if (clickCount % 2 === 0) { // 如果点击次数为偶数，则切换排序方式
       order.value = order.value === 'desc' ? 'asc' : 'desc';
     }
   } else {
     sort.value = selectedSort; // 否则更新排序条件为当前点击的按钮
     clickCount = 1; // 重置点击次数
     order.value = 'desc'; // 默认降序排序
   }*/
  executeSort(); // 执行排序
};

//const docTypeSelect = ref()
const docTypeSelect1 = ref("1")
const docTypeSelect2 = ref(false)


const isShow = ref(false)

const getIsLogin = (sonData) => {
  //console.log("接收到的sonData", sonData)
  isShow.value = sonData
}

const setIsShow = () => {
  isShow.value = false
}

const isCollected = async () => {
  let paperIds = []
  paperList.value.forEach(item => {
    paperIds.push(item.id)
  })
  const res = await isCollect(paperIds)

  return res.data

}
</script>

<template>

  <div class="common-layout">

    <el-container>
      <el-header style="padding: 0" height="100">
        <header-component @isShowLogin="getIsLogin"></header-component>
      </el-header>


      <el-container>
        <login-component :is-show="isShow" @close="setIsShow"></login-component>
        <el-aside width="20%">
          <div class="search_aside_main_container">
            <div class="select_hot_box">
              <el-checkbox v-model="checked1" label="热门下载" size="large" border/>
            </div>
            <div class="select_nav_outer_box">
              <el-tree
                  style="max-width: 100%"
                  :data="objs"
                  :props="defaultProps"
                  @node-click="handleNodeClick"
                  :highlight-current="true"
              ></el-tree>
            </div>

          </div>

        </el-aside>
        <el-container>
          <el-main class="search_main_main_container">

            <div class="select_outer_box">

              <div class="category">

                <ul>
                  <span>文件</span>
                  <li>
                    <div>
                      <el-checkbox-group v-model="docType" size="large">
                        <el-checkbox-button v-for="docType in categoryByDocType" :key="docType" :value="docType">
                          {{ docType }}
                        </el-checkbox-button>
                      </el-checkbox-group>
                    </div>
                    <!--                    <div>
                                          <el-checkbox v-model="selectedCategories" :label="check" size="large"
                                                       v-for="(check,index) in categoryByDocType" :key="index"
                                                       @change="selectDocType(index)" :checked="isSelect(index)"/>

                                        </div>-->
                  </li>

                </ul>

              </div>
              <div class="level">
                <ul>
                  <span>价格</span>
                  <li>
                    <div>
                      <el-checkbox-group v-model="price" size="large">
                        <el-checkbox-button v-for="price in categoryByPrice" :key="price" :value="price">
                          {{ price }}
                        </el-checkbox-button>
                      </el-checkbox-group>
                    </div>
                  </li>

                </ul>
              </div>
              <div class="more">
                <ul>
                  <span>等级</span>
                  <li>
                    <div>
                      <el-checkbox-group v-model="difficulty" size="large">
                        <el-checkbox-button v-for="level in categoryByDifficulty" :key="level" :value="level">
                          {{ level }}
                        </el-checkbox-button>
                      </el-checkbox-group>
                    </div>
                  </li>

                </ul>

              </div>
            </div>
            <div class="sort_outer_box">
              <div>
                <el-radio-group v-model="sort" size="large">
                  <el-radio-button :label="radio" :value="radio" v-for="radio in sortRadioGroup" :key="radio"
                                   @change="handleClickSort(radio)"/>

                </el-radio-group>
              </div>
              <div class="count">
                共计：<span>{{ total }}</span> 条
              </div>
            </div>
            <div class="paper-list-container" v-for="(paper,index) in paperList" :key="index" v-if="paperList.length>0">
              <paper-item :paper="paper" :docTypeLogoPath="docTypeLogoPath(paper)"></paper-item>
            </div>
            <el-empty description="description" v-else/>

            <div class="bottom-pagination" v-show="paperList.length>0">
              <el-pagination background layout="prev, pager, next" :total="total" v-model:current-page="currentPage"
                             @change="pageChane(currentPage)"/>
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

<style lang="less" scoped>
/deep/ .el-footer {
  width: 100%;
  margin-bottom: 5%;
  margin-top: 20px;
  padding: 0;
}

.login-box-outer {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.53);
}

.search_header_container {
  /*
  固定头部
  style="position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;"
  */

  /*  position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;*/
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

.search_main_main_container {

  background-color: #f2f2f2;

  .select_outer_box {
    z-index: 0;
    border-radius: 20px;
    padding-top: 8px;
    padding-bottom: 8px;
    background: white;
    background-origin: content-box;

    .category, .level, .more {
      height: 20%;

      ul {
        align-items: center;

        span {
          color: rgb(112, 110, 110);

        }

        display: flex;

        li {
          list-style: none;
          text-align: center;
          margin-left: 2%;
        }
      }
    }
  }

  .sort_outer_box {
    z-index: 0;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(224, 218, 218, 0.62);
    border-radius: 20px;


    /deep/ .el-radio-button:first-child .el-radio-button__inner {
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
    }

    /deep/ .el-radio-button:last-child .el-radio-button__inner {
      border-bottom-right-radius: 20px;
      border-top-right-radius: 20px;
    }


    .count {
      margin-right: 5%;

      span {
        color: #e1450f;
        font-size: 1.5rem;
        font-weight: 600;
      }
    }
  }

  .bottom-pagination {
    margin-top: 2%;
    display: flex;
    justify-content: flex-end;
    margin-right: 10%;
  }
}

.search_aside_main_container {
  /*
固定头部
style="position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;"
*/
  /* position: fixed;
   top: 0;
   left: 0;*/
  width: 100%;


  .select_hot_box {
    margin-top: 10px;
    margin-bottom: 10px;

    /deep/ .el-checkbox {
      width: 100%;
    }
  }

  .select_nav_outer_box {

    background-color: rgba(224, 218, 218, 0.62);

    /deep/ .el-tree-node__content {
      height: 50px;
    }
  }
}


</style>
