<script setup>
import {ref, onMounted, watch} from 'vue'
import {useCookies} from "vue3-cookies";
import {useLogin} from "@/stores/login.js";
import {logout} from "@/apis/login.js";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const {cookies} = useCookies()

const input = ref('')
const circleUrl = ref('/src/assets/奶龙头像.png')
const state = ref('')
const links = ref([])

const loadAll = () => {
  return [
    {value: 'vue', link: 'https://github.com/vuejs/vue'},
    {value: 'element', link: 'https://github.com/ElemeFE/element'},
    {value: 'cooking', link: 'https://github.com/ElemeFE/cooking'},
    {value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui'},
    {value: 'vuex', link: 'https://github.com/vuejs/vuex'},
    {value: 'vue-router', link: 'https://github.com/vuejs/vue-router'},
    {value: 'babel', link: 'https://github.com/babel/babel'},
  ]
}

let timeout

const querySearchAsync = (queryString, cb) => {
  const results = queryString
      ? links.value.filter(createFilter(queryString))
      : links.value

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 1000 * Math.random())
}

const createFilter = (queryString) => {
  return (restaurant) => {
    return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const handleSelect = (item) => {
  console.log(item)
}

onMounted(() => {
  links.value = loadAll()
  generateBreadcrumb()
})

const show = ref(false)
const isLoginShow = ref(false)

const emit = defineEmits(['isShowLogin'])

/*const loginState = */

const login = () => {
  isLoginShow.value = true
  // useLogin().loginState = true
  emit('isShowLogin', isLoginShow.value)
}

//console.log("获取到的SESSION", cookies.keys())

function getAllCookies() {
  const cookies = document.cookie.split(';');
  const cookieMap = {};
  cookies.forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    cookieMap[name] = value;
  });
  return cookieMap;
}

// 获取所有的cookie
/*const allCookies = getAllCookies();
console.log(allCookies);*/

const loginState = ref(localStorage.getItem('loginState') === '1')

const centerDialogVisible = ref(false)
const logoutHandler = async () => {
  localStorage.setItem('loginState', '0')
  const res = await logout().then(res => {
    console.log("登出成功", res)
  })
  location.reload()
}

const path = ref('')
const crumbs = ref([])

const generateBreadcrumb = () => {
  const matchedRoutes = route.matched;
  crumbs.value = matchedRoutes.map(route => ({
    to: route.path,
    label: route.name
  }));
}

const routerWatch = watch(route, generateBreadcrumb);

const pushToPersonal = () => {
  router.push({name: 'personal'})
}
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

  <el-header class="search_header_container">
    <div class="logo"><a href=""><img src="https://uat.sciradar.com/img/logo-dark.c2967aad.svg" alt=""></a></div>
    <!--    <el-input v-model="input" placeholder="请输入关键词"></el-input>-->
    <!--    <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="Please input"
            @select="handleSelect"
        />-->

    <!--    <div class="personal-box">
          个人中心
        </div>-->

    <slot name="content">

      <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="Please input"
          @select="handleSelect"
      />

    </slot>
    <div class="avatar" v-show="loginState">
      <el-avatar :src="circleUrl" @click="pushToPersonal"/>
    </div>
    <div class="login-register" v-show="!loginState">
<!--      <el-button class="el-button" type="primary" @click="login"><i class="iconfont icon-denglu"></i></el-button>-->
      <button class="login-but" @click="login">
        登录
      </button>
    </div>
  </el-header>
  <div class="router">
    <el-breadcrumb separator="/" style="font-size: 1.1rem">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(crumb, index) in crumbs" :key="index">
        <router-link :to="crumb.to">{{ crumb.label }}</router-link>
      </el-breadcrumb-item>

    </el-breadcrumb>
  </div>


</template>


<style scoped lang="less">

.router {
  margin-top: 20px;
  margin-bottom: 10px;

}

.login-register {
  /* position: absolute;
   right: 20px;
   top: 9px;*/

  .login-but{
    border: solid 1px mediumpurple;
    color: mediumpurple;
    border-radius: 20px;
    width: 100px;
    height: 40px;
    margin-top: 10px;
  }


  .el-button {
    border-radius: 10px;
    width: 100px;
    margin-top: 10px;
  }


}

.search_header_container {

  .personal-box {
    background-color: #3498db;
    color: white;
    border-radius: 10px;
    padding: 5px 10px;
    width: 100px;
    text-align: center;
    height: 250px;
    position: absolute;
    //margin-top: 50%;
  }

  /deep/ .el-autocomplete {
    .el-input {
      height: 50px;
    }

    width: 50%;

  }

  /*
  固定头部
  style="position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;"
  */

  /*position: fixed;
  top: 0;
  left: 0;*/
  width: 100%;
  // z-index: 1000;
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
    margin-right: 2%;

    .el-avatar {
      transform: scale(1.5);

    }
  }


}
</style>