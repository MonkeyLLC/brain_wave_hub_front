<script>

</script>


<template>
  <div class="header-main-container">
    <div class="logo"><a href=""><img src="https://uat.sciradar.com/img/logo-dark.c2967aad.svg" alt=""></a></div>
    <div class="nav">
      <ul>
        <li>帮助中心</li>
        <li>联系我们</li>
        <li>校网通入口</li>
      </ul>
    </div>
    <div class="login-register">
      <el-button class="el-button" type="primary"><i class="iconfont icon-denglu"></i></el-button>
    </div>
  </div>
</template>


<style lang="less" scoped>
.header-main-container {

  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  position: relative;

  .nav {
    ul {
      display: flex;
      list-style: none;
      color: black;
      width: 300px;
      justify-content: space-evenly;
    }


  }

  .login-register {
    /* position: absolute;
     right: 20px;
     top: 9px;*/

    .el-button {
      border-radius: 10px;
      width: 100px;
      margin-top: 10px;
    }


  }

  .logo {
    display: flex;
    align-items: center;

    a {
      display: block;
      margin: auto 0;
    }

  }

}
</style>