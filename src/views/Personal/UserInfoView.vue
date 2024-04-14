<script setup>
import {ref, onMounted} from "vue";
import {getUserInfo} from "@/apis/user.js";
import {uploadAvatar} from "@/apis/user.js";

const circleUrl = ref('/src/assets/奶龙头像.png')

const userinfo = ref({
  /* username: '',
   nickname: '',
   qq: '',
   email: '',
   phone: '',
   avatar: ''*/
})

const getUserInfoHandler = async () => {
  const res = await getUserInfo().then(res => {
    userinfo.value = res.data
    console.log("获取用户信息成功", userinfo.value.nickname)
  })
}

onMounted(() => {
  getUserInfoHandler()
})

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  // 调用上传头像的方法
  const res = await uploadAvatar(file)
      .then(() => {
        // 上传成功后更新页面显示的头像
        // 更新 circleUrl
        // 示例：circleUrl.value = 新的头像 URL
        console.log('上传头像成功', res);
      })
      .catch(error => {
        console.error('上传头像失败', error);
        // 处理上传失败情况，例如显示错误消息
      });
};

const handleAvatarUpload = () => {
  // 触发文件选择
  this.document.getElementById('avatar-input').click();``
};
</script>

<template>


  <div class="content">
    <el-row>
      <el-col :span="24">
        <div class="info clo">
          <div class="avatar" style="display: flex; align-items: center;margin-left: 5%">
            <el-avatar :size="50" :src="circleUrl" @click="handleAvatarUpload">
            </el-avatar>
            <div style="margin-left: 20px">{{ userinfo.nickname }}</div>
          </div>
          <div class="info-right" style="margin-right: 5%">
            <button
                style="width: 100px; height: 40px;  border: solid 1px mediumpurple; color:mediumpurple ; border-radius: 20px"
            >专业版会员
            </button>
          </div>
        </div>
      </el-col>
    </el-row>


    <el-row :gutter="20">
      <el-col :span="12">
        <div class="clo">
          <div class="tar-outer">
            <span class="tar">用户名:</span>
            <span>{{ userinfo.username }}</span>
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="clo">
          <div class="tar-outer">
            <span class="tar">手机号:</span>
            <span>{{ userinfo.phone }}</span>
          </div>
        </div>
      </el-col>

    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="clo">
          <div class="tar-outer">
            <span class="tar">邮箱:</span>
            <span>{{ userinfo.email }}</span>
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="clo">
          <div class="tar-outer">
            <span class="tar">QQ:</span>
            <span>{{ userinfo.qq }}</span>
          </div>
        </div>
      </el-col>

    </el-row>

  </div>


</template>

<style lang="less" scoped>
.content {
  width: 100%;
  padding-top: 3%;

  .clo {

    width: 100%;
    height: 100px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 20px;
    border: 1px solid #beb9b9;

    .tar-outer {
      margin-left: 5%;

      .tar {
        color: #817a7a;
        margin-right: 10px;
      }
    }

  }
}
</style>