<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormProps} from 'element-plus'
import {jsonLogin} from '@/apis/login'
import {useLogin} from '@/stores/login'

const labelPosition = ref<FormProps['labelPosition']>('top')

const formLabelAlign = ref({
  username: '',
  password: '',
})
const props = defineProps(
    {
      isShow: {
        type: Boolean
      }
    }
)
const isShow = ref(props.isShow)
const emit = defineEmits(['close'])
const close = () => {
  /*通知父组件修改isShow*/

  emit('close')
  // isShow.value = false
  console.log(isShow.value)
}


const dialogFormVisible = ref(false)


const handleLogin = async () => {
  const res = await jsonLogin(formLabelAlign.value).then(res => {
    console.log("登陆成功", res)
    // 登陆成功的时候刷新页面
    location.reload()
    //useLogin().loginState = true
    localStorage.setItem('loginState', '1');
    emit('close')
  })
}


import {userList} from '@/apis/login'

const getUserList = async () => {
  const res = await userList().then(res => {
    console.log("获取用户列表", res)
  })
}

//getUserList()
</script>

<template>


<!--  <el-button plain @click="dialogFormVisible = true">
    Open a Form nested Dialog
  </el-button>-->


  <el-dialog v-model="props.isShow" title="欢迎登陆" width="30%" :before-close="close">
    <el-form
        :label-position="labelPosition"
        label-width="auto"
        :model="formLabelAlign"
        style="max-width: 100%"

    >
      <!--          <div style="display: flex; justify-content: flex-end;">
                  <img style="width: 5%;cursor: pointer" src="@/assets/取消.svg" alt="" @click="close">
                </div>-->
      <div style="display: flex; justify-content: center;margin-bottom: 5%;margin-top: 5%">
        <img src="https://uat.sciradar.com/img/logo-dark.c2967aad.svg" alt="">
      </div>
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password" type="password"/>
      </el-form-item>

      <div style="display: flex; justify-content: center;margin-bottom: 5%">
        <el-button style="margin-left: 0; margin-right: 15%; height: 40px" class="login-bottom" type="primary"
                   @click="handleLogin()"
        >登录
        </el-button>
        <el-button style=" height: 40px" class="login-bottom" type="primary">注册</el-button>
      </div>
      <el-form-item>

      </el-form-item>
    </el-form>

  </el-dialog>

  <!--      <el-form
            :label-position="labelPosition"
            label-width="auto"
            :model="formLabelAlign"
            style="max-width: 100%"

        >
          <div style="display: flex; justify-content: flex-end;">
            <img style="width: 5%;cursor: pointer" src="@/assets/取消.svg" alt="" @click="close">
          </div>
          <div style="display: flex; justify-content: center;margin-bottom: 5%;margin-top: 5%">
            <img src="https://uat.sciradar.com/img/logo-dark.c2967aad.svg" alt="">
          </div>
          <el-form-item label="用户名">
            <el-input v-model="formLabelAlign.name"/>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLabelAlign.region"/>
          </el-form-item>

          <div style="display: flex; justify-content: center;margin-bottom: 5%">
            <el-button style="margin-left: 0; margin-right: 15%; height: 40px" class="login-bottom" type="primary">登录
            </el-button>
            <el-button style=" height: 40px" class="login-bottom" type="primary">注册</el-button>
          </div>
          <el-form-item>

          </el-form-item>
        </el-form>-->


</template>

<style lang="less" scoped>

.login-main-outer-box {
  background-color: bisque;
  width: 99vw; /* 使用视口宽度作为宽度 */
  height: 98vh; /* 使用视口高度作为高度 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

/deep/ .el-input__inner {
  height: 40px;
}

.login-form-box {
  border-radius: 20px;
  width: 30%;
  background-color: rgba(80, 243, 243, 0.2);
  max-width: 100%;
  padding: 20px;


}
</style>


