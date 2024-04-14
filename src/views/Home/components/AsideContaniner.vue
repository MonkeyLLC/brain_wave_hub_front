<script setup>
import {ref} from 'vue';
import ExactSelect from '@/views/Home/components/ExactSelect.vue';
import {useRouter} from "vue-router";

const router = useRouter()

const selectOneStage = ref(null)
const gradeStages = ['高中', '初中', '小学'];
const selectGradeStage = (stage) => {
  selectOneStage.value = stage
}

const radioGroup = ref(['高中', '初中', '小学'])
const radio1 = ref('高中')
console.log(radio1.value)
const radio2 = ref('初 中')
const radio3 = ref('小 学')


const a = [
  {
    stage: '小学',
    select: [
      {
        key: '同步教学',
        list: ['人教版', '湘教版', '北师大版', '湖师大版', '鲁教版']
      },
      {
        key: '复习备考',
        list: ['小升初', '开学考', '期中考', '期末考', '小升初', '开学考', '期中考', '期末考']
      }
    ]
  },
  {
    stage: '初中',
    select: [
      {
        key: '同步教学',
        list: ['人教版', '湘教版', '北师大版', '湖师大版', '鲁教版']
      },
      {
        key: '复习备考',
        list: ['中考', '一模', '二模', '三模', '中考', '一模', '二模', '三模']
      }
    ]
  },
  {
    stage: '高中',
    select: [
      {
        key: '同步教学',
        list: ['人教版', '湘教版', '北师大版', '湖师大版', '鲁教版']
      },
      {
        key: '复习备考',
        list: ['高考', '一模', '二模', '三模', '高考', '一模', '二模', '三模']
      }
    ]

  }
]

const showExactSelect = ref(false)

const isShow = ref(true)
const putAwaySelect = () => {
  //ul1.value.style.height = 0
  isShow.value = !isShow.value
  console.log(isShow.value)
}

const ul1 = ref(null)
const showSelect = () => {

}

const smallGrade = ['语文', '数学', '英语', '科学', '道德与法治', '美术', '体育与健康'];
const middleGrade = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '道德与法治'];
const highGrade = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'];

const putToSearch = (item) => {
  router.push({
    name: 'result', query: {
      query: item,
      gradeCategory: radio1.value
    }
  })
}
</script>

<template>

  <div class="aside-main-container">

    <div>
      <el-radio-group v-model="radio1" size="large" class="select-stage">
        <el-radio-button v-for="item in radioGroup" :key="item" :label="item" class="flex-item"/>
      </el-radio-group>
    </div>

    <!-- 选择学科的选择框  -->
    <div class="select-class">

      <ul ref="ul1" v-if="radio1 === '高中' && isShow" @mouseleave="showExactSelect = false">
        <li @mouseover="showExactSelect = true" v-for="item in highGrade" :key="item" @click="putToSearch(item)">{{
            item
          }}
          <i class="iconfont icon-gengduo"></i>
        </li>
      </ul>

      <ul v-else-if="radio1 === '初中' && isShow" @mouseleave="showExactSelect = false">
        <li @mouseover="showExactSelect = true" v-for="item in middleGrade" :key="item" @click="putToSearch(item)">
          {{ item }}
          <i class="iconfont icon-gengduo"></i>
        </li>
      </ul>

      <ul v-else-if="isShow && radio1 === '小学'" @mouseleave="showExactSelect = false">
        <li @mouseover="showExactSelect = true" v-for="item in smallGrade" :key="item" @click="putToSearch(item)">
          {{ item }}
          <i class="iconfont icon-gengduo"></i>
        </li>
      </ul>

      <ul>
        <!--        <button v-if="isShow" @click="putAwaySelect()"><i class="iconfont icon-dark-primary"></i></button>
                <button v-else @click="putAwaySelect()"><i class="iconfont icon-dark-primary-copy"></i></button>-->
      </ul>
    </div>

  </div>

  <!--  <div
        @mouseover="showExactSelect = true"
        @mouseleave="showExactSelect = false"
        class="exact-select" v-show="showExactSelect">
      <ExactSelect :obj=a[0] v-if="radio1 === '小 学'">
        <template #default>
          <span class="span">同步教学</span>
        </template>
      </ExactSelect>
      <ExactSelect :obj=a[1] v-else-if="radio1 === '初 中'">
        <template #default>
          <span class="span">同步教学</span>
        </template>
      </ExactSelect>
      <ExactSelect :obj=a[2] v-else>
        <template #default>
          <span class="span">同步教学</span>
        </template>
      </ExactSelect>
    </div>-->

</template>

<style lang="less" scoped>
/deep/ .el-radio-button {
  height: 100%;
}

/deep/ .el-radio-button__inner {
  width: 100%;
  height: 80%;
  line-height: 100%;
  font-size: 18px;
}


.aside-main-container {


  .select-class {
    height: 500px;

    ul {

      padding: 0;
      margin: 0;


      li {
        // 用margin居中
        margin: 8px auto;
        border-radius: 10px;
        width: 90%;
        list-style: none;
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding-left: 15px;
        font-size: 15px;
        cursor: pointer;

        i {
          float: right;
          margin-right: 10px;
        }
      }

      li:hover {
        // 浅紫色带透明
        background-color: rgba(80, 243, 243, 0.2);
        color: #232121;
        box-shadow: 0 0 5px;
      }

    }

    ul:last-child {
      display: flex;
      justify-content: center;
      // panding居中
      button {

        width: 150px;
        height: 40px;
        border: none;
        border-radius: 8px;
      }

      button:hover {
        background-color: rgba(80, 243, 243, 0.2);
        color: #232121;
        box-shadow: 0 0 5px;
        cursor: pointer;
      }

      /deep/ i {
        margin: 0 auto;
      }
    }
  }


  .select-stage {
    display: flex;
    height: 60px;

    .flex-item {
      flex: 1;
      width: 100%;
    }
  }

  .grade {
    width: 33%;
    text-align: center;
    line-height: 60px;
  }

  width: 100%;

  background-color: rgb(255, 255, 255);
  // 阴影
  box-shadow: 0 0 10px;
  // 去除滑动条
  overflow: hidden;

  .select {

    background-color: aqua;
    height: 500px;

    .grade-stage {
      background-color: aliceblue;
      height: 60px;
      display: flex;

      .selected {
        background-color: #3498db;
        color: #ffffff;
      }
    }
  }
}

.exact-select {
  width: 500px;

  background-color: white;
  border: #3498db 1px solid;
  // 阴影
  box-shadow: 0 0 5px;
  border-radius: 20px;
  position: absolute;
  z-index: 100;
  top: 128px;
  left: 308px;

  .span {
    padding: 5px 20px;
    font-size: large;
    //字体加粗
    font-weight: bold;
  }
}
</style>