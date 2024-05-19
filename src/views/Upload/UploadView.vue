<script setup>
import {ref} from 'vue';
import HeaderComponent from "@/views/Home/components/HeaderComponent.vue";
import {useRouter} from "vue-router";

const router = useRouter()
import {reactive} from 'vue'
import {ElMessage} from "element-plus";
import {uploadRecord} from "@/apis/import.js";

const isShowForm = ref(true)
const putToMyUploaded = () => {
  isShowForm.value = false
  router.push({
    name: '我的上传',
  })
}

const returnUpload = () => {
  isShowForm.value = true
  router.back()
  //location.reload()
}
const region = {
  "河北省": ["石家庄", "保定市", "秦皇岛", "唐山市", "邯郸市", "邢台市", "沧州市", "承德市", "廊坊市", "衡水市", "张家口市"],
  "山西省": ["太原市", "大同市", "阳泉市", "长治市", "临汾市", "晋中市", "运城市", "晋城市", "忻州市", "朔州市", "吕梁市"],
  "内蒙古自治区": ["呼和浩特", "呼伦贝尔", "包头市", "赤峰市", "乌海市", "通辽市", "鄂尔多斯", "乌兰察布", "巴彦淖尔"],
  "辽宁省": ["盘锦市", "鞍山市", "抚顺市", "本溪市", "铁岭市", "锦州市", "丹东市", "辽阳市", "葫芦岛市", "阜新市", "朝阳市", "营口市"],
  "吉林省": ["吉林市", "通化市", "白城市", "四平市", "辽源市", "松原市", "白山市"],
  "黑龙江省": ["伊春市", "牡丹江", "大庆市", "鸡西市", "鹤岗市", "绥化市", "双鸭山市", "七台河市", "佳木斯市", "黑河市", "齐齐哈尔市"],
  "江苏省": ["无锡市", "常州市", "扬州市", "徐州市", "苏州市", "连云港市", "盐城市", "淮安市", "宿迁市", "镇江市", "南通市", "泰州市"],
  "浙江省": ["绍兴市", "温州市", "湖州市", "嘉兴市", "台州市", "金华市", "舟山市", "衢州市", "丽水市"],
  "安徽省": ["合肥市", "芜湖市", "亳州市", "马鞍山市", "池州市", "淮南市", "淮北市", "蚌埠市", "巢湖市", "安庆市", "宿州市", "宣城市", "滁州市", "黄山市", "六安市", "阜阳市", "铜陵市"],
  "福建省": ["福州市", "泉州市", "漳州市", "南平市", "三明市", "龙岩市", "莆田市", "宁德市"],
  "江西省": ["南昌市", "赣州市", "景德镇市", "九江市", "萍乡市", "新余市", "抚州市", "宜春市", "上饶市", "鹰潭市", "吉安市"],
  "山东省": ["潍坊市", "淄博市", "威海市", "枣庄市", "泰安市", "临沂市", "东营市", "济宁市", "烟台市", "菏泽市", "日照市", "德州市", "聊城市", "滨州市", "莱芜市"],
  "河南省": ["郑州市", "洛阳市", "焦作市", "商丘市", "信阳市", "新乡市", "安阳市", "开封市", "漯河市", "南阳市", "鹤壁市", "平顶山市", "濮阳市", "许昌市", "周口市", "驻马店市"],
  "湖北省": ["荆门市", "咸宁市", "襄樊市", "荆州市", "黄石市", "宜昌市", "随州市", "鄂州市", "孝感市", "黄冈市", "十堰市"],
  "湖南省": ["长沙市", "郴州市", "娄底市", "衡阳市", "株洲市", "湘潭市", "岳阳市", "常德市", "邵阳市", "益阳市", "永州市", "张家界市", "怀化市"],
  "广东省": ["江门市", "佛山市", "汕头市", "湛江市", "韶关市", "中山市", "珠海市", "茂名市", "肇庆市", "阳江市", "惠州市", "潮州市", "揭阳市", "清远市", "河源市", "东莞市", "汕尾市", "云浮市"],
  "广西壮族自治区": ["南宁市", "贺州市", "柳州市", "桂林市", "梧州市", "北海市", "玉林市", "钦州市", "百色市", "防城港市", "贵港市", "河池市", "崇左市", "来宾市"],
  "海南省": ["海口市", "三亚市"],
  "四川省": ["乐山市", "雅安市", "广安市", "南充市", "自贡市", "泸州市", "内江市", "宜宾市", "广元市", "达州市", "资阳市", "绵阳市", "眉山市", "巴中市", "攀枝花市", "遂宁市", "德阳市"],
  "贵州省": ["贵阳市", "安顺市", "遵义市", "六盘水市"],
  "云南省": ["昆明市", "玉溪市", "大理市", "曲靖市", "昭通市", "保山市", "丽江市", "临沧市"],
  "陕西省": ["咸阳市", "榆林市", "宝鸡市", "铜川市", "渭南市", "汉中市", "安康市", "商洛市", "延安市"],
  "甘肃省": ["兰州市", "白银市", "武威市", "金昌市", "平凉市", "张掖市", "嘉峪关市", "酒泉市", "庆阳市", "定西市", "陇南市", "天水市"],
  "青海省": ["西宁市"],
  "宁夏回族自治区": ["银川市", "固原市", "青铜峡市", "石嘴山市", "中卫市"],
  "新疆维吾尔自治区": ["乌鲁木齐市", "克拉玛依市"]
}


const versions = ['人教版', '湘教版', '北师大版', '湖师大版', '鲁教版']
const province = ref('')
const form = ref({
  name: '',
  docType: '',
  stage: '',
  discipline: '',
  grade: '',
  scene: '',
  version: [],
  knowledge: '',
  textBook: '',
  province: province.value,
  city: '',
})

const reset = () => {
  form.value = {
    name: '',
    docType: '',
    stage: '',
    discipline: '',
    grade: '',
    scene: '',
    version: [],
    knowledge: '',
    textBook: '',
    province: province.value,
    city: '',
  }
}

/*for ((province, city) in region) {
  console.log(province)
}*/

const file = ref(null)
const handleFileChange = (e) => {
  file.value = e.target.files[0]
  form.value.name = file.value.name.trim()
}
const smallDiscipline = ['语文', '数学', '英语', '科学', '道德与法治', '美术', '体育与健康'];
const middleDiscipline = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '道德与法治'];
const highDiscipline = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'];
const stage = ['小学', '初中', '高中']

const smallGrade = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级']
const middleGrade = ['七年级初一', '八年级初二', '九年级初三']
const highGrade = ['高一', '高二', '高三']

const smallTextBook = ['一年级上册', '一年级下册', '二年级上册', '二年级下册', '三年级上册', '三年级下册',
  '四年级上册', '四年级下册', '五年级上册', '五年级下册', '六年级上册', '六年级下册']
const middleTextBook = ['七年级初一上册', '七年级初一下册', '八年级初二上册', '八年级初二下册', '九年级初三上册', '九年级初三下册']
const highTextBook = ['高一上册', '高一下册', '高二上册', '高二下册', '高三上册', '高三下册']

const scene = ['期末', '期中', '月考', '小升初', '中考复习', '高考复习']

const onSubmit = async (name) => {

  await uploadRecord(name)

  ElMessage.success('上传成功，请耐心等待审核')
}

const noSelectStage = () => {
  console.log('no select stage')
  ElMessage.error('请先选择阶段')
}


</script>

<template>
  <header-component></header-component>
  <div class="upload-container-outer">
    <div class="upload-top">
      <p style="font-size: 1.5rem; font-weight: 600;margin-bottom: 0">上传中心</p>
      <span>上传您的资源，分享给更多人</span>
      <button class="upload-top-bt" @click="putToMyUploaded" v-if="isShowForm">我的上传</button>
      <button class="upload-top-bt" @click="returnUpload" v-else>返回上传</button>
    </div>

    <div class="upload-container">
      <el-form :model="form" label-width="auto" style="width: 70%; margin: 0 auto" size="large" v-show="isShowForm">
        <el-row>
          <el-col :span="11">
            <el-form-item label="上传文件">
              <!--              <el-input type="file" v-model="file" @change="handleFileChange"></el-input>-->
              <input type="file" @change="handleFileChange">
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="资源名称">
              <el-input v-model="form.name" placeholder="请输入资源名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="阶段">
              <el-select v-model="form.stage">
                <el-option :label="item" :value="item" v-for="item in stage" :key="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :offset="2" :span="11">
            <el-form-item label="类型">
              <el-select>
                <el-option label="选项1" value="1"></el-option>
                <el-option label="选项2" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="学科">
              <el-select v-model="form.discipline" v-if="form.stage!==null || form.stage!==''">
                <el-option :label="item" :value="item" v-for="item in smallDiscipline" :key="item"
                           v-if="form.stage==='小学'"></el-option>
                <el-option :label="item1" :value="item1" v-for="item1 in middleDiscipline" :key="item1"
                           v-else-if="form.stage==='初中'"></el-option>
                <el-option :label="item2" :value="item2" v-for="item2 in highDiscipline" :key="item2"
                           v-else-if="form.stage==='高中'"></el-option>
              </el-select>
              <el-select disabled v-else>

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="年级">
              <el-select v-model="form.grade" v-if="form.stage!==null || form.stage!==''">
                <el-option :label="item" :value="item" v-for="item in smallGrade" :key="item"
                           v-if="form.stage==='小学'"></el-option>
                <el-option :label="item1" :value="item1" v-for="item1 in middleGrade" :key="item1"
                           v-else-if="form.stage==='初中'"></el-option>
                <el-option :label="item2" :value="item2" v-for="item2 in highGrade" :key="item2"
                           v-else-if="form.stage==='高中'"></el-option>
              </el-select>
              <el-select disabled v-else>

              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="场景">
              <el-select v-model="form.scene">
                <el-option :label="item" :value="item" v-for="item in scene" :key="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :offset="2" :span="11">
            <el-form-item label="教材版本">
              <el-select v-model="form.version">
                <el-option :label="item" :value="item" v-for="item in versions" :key="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="11">
            <el-form-item label="知识点">
              <el-input v-model="form.desc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :offset="2" :span="11">
            <el-form-item label="所属教材">
              <el-select v-model="form.textBook" v-if="form.stage!==null || form.stage!==''">
                <el-option :label="item" :value="item" v-for="item in smallTextBook" :key="item"
                           v-if="form.stage==='小学'"></el-option>
                <el-option :label="item1" :value="item1" v-for="item1 in middleTextBook" :key="item1"
                           v-else-if="form.stage==='初中'"></el-option>
                <el-option :label="item2" :value="item2" v-for="item2 in highTextBook" :key="item2"
                           v-else-if="form.stage==='高中'"></el-option>
              </el-select>
              <el-select disabled v-else>

              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="省份">
              <el-select v-model="province">
                <el-option :label="index" :value="index" v-for="(province,index) in region" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :offset="2" :span="11">
            <el-form-item label="城市">
              <el-select v-model="form.city">
                <el-option :label="city" :value="city" v-for="city in region[province]"></el-option>
              </el-select>

            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <button class="bottom-bt" @click="onSubmit(form.name)">提交</button>
          </el-col>

          <el-col :offset="2" :span="11">
            <button class="bottom-bt" @click="reset">清空</button>
          </el-col>
        </el-row>

      </el-form>
      <router-view></router-view>
    </div>
  </div>
  <footer-component style="margin-top: 2%"></footer-component>
</template>

<style lang="less" scoped>
.upload-container-outer {
  .upload-top {
    padding: 10px 2%;

    .upload-top-bt {
      border: none;
      color: white;
      background-color: #3a8ee6;
      margin-left: 2%;
      border-radius: 20px;
      padding: 8px 40px;
      margin-top: 10px;
      cursor: pointer;
    }

    .upload-top-bt:active {
      background-color: #3498db;
      scale: 1.05;
      transition-duration: 0.1s;
    }
  }

  padding-bottom: 2%;

  width: 100%;
  height: 100%;
  background-color: #f2f2f2;

  .upload-container {
    width: 80%;
    margin: 2% auto;
    background-color: #fff;
    border-radius: 20px;
    padding: 3% 1%;

    .bottom-bt {
      width: 60%;
      margin-left: 20%;
      border: none;
      background-color: #3a8ee6;
      color: white;
      border-radius: 20px;
      padding: 10px 20px;
      cursor: pointer;
    }

    .bottom-bt:active {
      background-color: #3498db;
      scale: 1.05;
      transition-duration: 0.1s;
    }
  }
}
</style>