<script lang="ts" setup>
import {isShallow, ref} from 'vue'

const form = ref({
  username: '',
  password: '',
})

const resetForm = (form) => {
  form.username = ''
  form.password = ''
}

defineProps({
  isShow: {
    type: Boolean
  }
})


</script>

<template>
  <div class="center-container" v-if="isShow">
    <div class="main-container">
      <el-form ref="formRef" :model="form" label-width="120px" class="login-form">
        <div class="container">
          <img style="margin-bottom: 16px" src="https://uat.sciradar.com/img/logo-dark.c2967aad.svg" alt="">
        </div>
        <el-form-item prop="email" label="用户名" :rules="[
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur',
                    },
                    {
                        type: 'email',
                        message: '请输入正确的用户名',
                        trigger: ['blur', 'change'],
                    },
                ]">
          <el-input v-model="form.username" class="login-form-input"></el-input>
        </el-form-item>
        <el-form-item :rules="{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur',
                }" label="密码" prop="password">
          <el-input v-model="form.password" class="login-form-input"/>
        </el-form-item>
        <el-form-item>
          <el-button class="login-bottom" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style>
.login-form {
  background-color: aliceblue;
  border-radius: 20px;
  padding-top: 20px;
  padding-bottom: 8px;
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-items: center;
}

.login-form-input {
  height: 40px;
  width: 250px;
}

.login-form .container {
  text-align: center;
}

.login-bottom {
  width: 150px;
  margin-left: 40px;
  height: 40px;
  font-size: large;
}

.center-container {
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* 让容器高度占据整个视窗 */
}

.main-container {
  margin: auto 0;
}
</style>