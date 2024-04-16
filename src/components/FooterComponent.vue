<script setup>


</script>

<template>
  <div class="footer-outer">
    <div class="left"><div class="logo"><a href=""><img src="https://uat.sciradar.com/img/logo-dark.c2967aad.svg" alt=""></a></div></div>
    <div class="center">
      <ul>
        <span>常见问题</span>
        <li>账号问题</li>
        <li>上传问题</li>
        <li>下载问题</li>
        <li>充值问题</li>
        <li>会员问题</li>
        <li>更多</li>
      </ul>

      <ul>
        <span>新手帮助</span>
        <li>在线客服</li>
        <li>什么是云币</li>
        <li>上传流程</li>
        <li>视频帮助</li>
        <li>帮助文档</li>
      </ul>

      <ul>
        <span>互动交流</span>
        <li>意见反馈</li>
        <li>交流中心</li>
        <li>留言中心</li>
        <li>加入我们</li>
      </ul>
    </div>
    <div class="right">
      <img style="width: 150px;margin: 20px 20px" src="@/assets/关注我们.jpg" alt="">
    </div>
  </div>
</template>
<style lang="less" scoped>

.footer-outer{

  background-color: #B3C0D1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .left{
    .logo {
      display: flex;
      align-items: center;
      height: 70%;
      a {
        display: block;
        margin: auto 0;
      }
    }
  }
  .center{
    ul{
      span{
        font-size: 1.1rem;
        font-weight: bold;
      }
      padding: 0;
      margin-bottom: 15px;
      li{
        display: inline-block;
        margin: 0 10px;
        font-size: 0.9rem;
        cursor: pointer;
      }
    }
  }
}

</style>