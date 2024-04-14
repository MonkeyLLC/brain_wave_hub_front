<script setup>

import HeaderComponent from "@/views/Home/components/HeaderComponent.vue";
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';


const radio1 = ref('个人信息')
const router = useRouter()
import {logout} from "@/apis/login.js";

const selectPersonalView = (value) => {
  router.push({name: value})

}


onMounted(() => {
  selectPersonalView('info')

})
const selectGroup = ref([
  {
    label: '个人信息',
    value: 'info'
  },
  {
    label: '下载记录',
    value: 'history'
  },

  {
    label: '通知中心',
    value: 'message'
  }

])
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')


const logoutHandler = async () => {
  localStorage.setItem('loginState', '0')
  const res = await logout().then(res => {
    router.push({name: 'home'})
    console.log("登出成功", res)
  })

}

const centerDialogVisible = ref(false)

</script>
<template>

  <el-dialog v-model="centerDialogVisible" title="提示" width="30%" center>
    <span>
      您确定退出吗
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="logoutHandler">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-container>
    <el-header style="padding: 0" height="100">
      <header-component>
      </header-component>
    </el-header>
    <el-container>
      <el-main class="personal-main-outer-box">

        <div class="top">
          <p style="font-weight: bold; font-size: 1.5rem;margin: 10px 0">
            个人中心
            <button class="logout" @click="centerDialogVisible = true">退出登录</button>
          </p>
          <span style="color: rgb(45,43,43); font-size: 0.9rem">
        查看并管理您的个人信息、会员权限、订单记录等。
      </span>
        </div>

        <div class="main">
          <div class="select">
            <el-radio-group v-model="radio1" size="large">
              <el-radio-button :label="item.label" :value="item.value"
                               v-for="(item,index) in selectGroup" :key="index"
                               @change="selectPersonalView(item.value)"/>
              <!--              <el-radio-button label="下载记录" value="history"/>
                            <el-radio-button label="会员权益" value="member"/>
                            <el-radio-button label="通知中心" value="message"/>-->
            </el-radio-group>
          </div>

          <div class="content-area">
            <router-view>
            </router-view>
          </div>


        </div>
      </el-main>
    </el-container>
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

    .logout {
      border-radius: 20px;
      margin-left: 2%;
      padding: 5px 10px;
    }
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


  }
}
</style>