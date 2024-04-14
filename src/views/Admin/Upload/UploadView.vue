<script setup>
import {reactive, ref} from 'vue'
import {importSingle} from '@/apis/import'


import {ElMessage, ElMessageBox} from 'element-plus';

const fileList = ref([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
]);

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
      `The limit is 3, you selected ${files.length} files this time, add up to ${
          files.length + uploadFiles.length
      } totally`
  );
};

const beforeRemove = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
      `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
      () => true,
      () => false
  );
};

const middleGrade = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '道德与法治'];
const textBooks = ['七年级初一上册', '七年级初一下册', '八年级初二上册', '八年级初二下册', '九年级初三上册', '九年级初三下册'];

const file = ref(null)
// do not use same name with ref
const form = reactive({
  grade: "",
  discipline: "英语",
  gradeCategory: "初中",
  version: "",
  finalAim: "中考",
  scene: "",
  name: "",
  isReal: '2',
  examName: "",
  examTime: "",
  schoolName: "",
  schoolAddress: "",
  province: "",
  city: "",
  districts: "",
  downloadCount: 0,
  uploadTime: null,
  url: "",
  isVip: "2",
  expense: 0.0,
  textBook: "",
  knowledge: "",
  /* docType: '1',*/
  abstract: "",
  authorId: 3,
  author: "李利超",
  difficulty: '1',
  viewCount: 0,
})


const handleFileUpload = (e) => {
  //console.log('file', e)
  file.value = e.target.files[0]
  form.name = file.value.name.trim()

  //console.log('file', form.name)
}

const onSubmit = async () => {
  const res = await importSingle(form, file.value)
  console.log('submit!', res)
}
</script>


<template>
  <h3 style="text-align: center">上传资源</h3>
  <div
      style="width: 80%;background-color: rgba(246,244,244,0.69);display: flex;justify-content: center;margin-left: 10%;padding: 20px 0;border-radius: 20px">

    <el-form :model="form" label-width="auto" style="max-width: 800px">


      <el-row>
        <el-col>
          <div style="margin: 20px 0">
            <label for="fileUpload">选择文件:</label>
            <input type="file" id="fileUpload" @change="handleFileUpload">
          </div>
        </el-col>
      </el-row>

      <!--      <el-row>
              <el-col>
                <el-form-item label="上传资源">
                  <el-upload
                      v-model:file-list="fileList"
                      class="upload-demo"
                      multiple
                      @change="handleFileUpload"

                  >
                    <el-button type="primary">Click to upload</el-button>
                  </el-upload>
                </el-form-item>

              </el-col>
            </el-row>-->

      <el-row>
        <el-col>
          <el-form-item label="资源名">
            <el-input v-model="form.name"/>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="年级">
            <el-select v-model="form.grade" placeholder="请选择年级">
              <el-option label="七年级初一" value="七年级初一"/>
              <el-option label="八年级初二" value="八年级初二"/>
              <el-option label="九年级初三" value="九年级初三"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="阶段">
            <el-select v-model="form.gradeCategory" placeholder="请选择年级阶段">
              <el-option label="小学" value="小学"/>
              <el-option label="初中" value="初中"/>
              <el-option label="高中" value="高中"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="学科">
            <el-select v-model="form.discipline" placeholder="选择学科">
              <el-option :label="item" :value="item" v-for="item in middleGrade" :key="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="版本">
            <el-input v-model="form.version"/>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="适用场景">
            <el-input v-model="form.scene"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="目标">
            <el-input v-model="form.finalAim"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="是否真题卷">
            <el-select v-model="form.isReal" placeholder="是否真题卷">
              <el-option label="是" value="1"/>
              <el-option label="否" value="2"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真题来源">
            <el-input v-model="form.examName"/>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="时间">
            <el-date-picker
                v-model="form.examTime"
                type="datetime"
                placeholder="Select date and time"
            />
          </el-form-item>

        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="学校名">
            <el-input v-model="form.schoolName"/>
          </el-form-item>

        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="省份">
            <el-input v-model="form.province"/>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="城市">
            <el-input v-model="form.city"/>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="区县">
            <el-input v-model="form.districts"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="下载量">
            <el-input v-model="form.downloadCount"/>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="浏览量">
            <el-input v-model="form.viewCount"/>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="上传时间">
            <el-date-picker
                v-model="form.uploadTime"
                type="datetime"
                placeholder="Select date and time"
            />

<!--            <label>
              上传时间:
              <input type="datetime-local" name="上传时间" id="上传时间" v-model="form.uploadTime">
            </label>-->

          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="是否vip可下载">
            <el-select v-model="form.isVip" placeholder="">
              <el-option label="是" value="1"/>
              <el-option label="否" value="2"/>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="难度等级">
            <el-select v-model="form.difficulty" placeholder="">
              <el-option label="初级" value="1"/>
              <el-option label="中等" value="2"/>
              <el-option label="高级" value="3"/>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="下载花费">
            <el-input v-model="form.expense"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="教材">
            <el-select v-model="form.textBook" placeholder="">
              <el-option :label="item" :value="item" v-for="item in textBooks" :key="item"/>

            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="知识点">
            <el-input v-model="form.knowledge"/>
          </el-form-item>
        </el-col>
      </el-row>

      <!--      <el-row>
              <el-col :span="24">
                <el-form-item label="资源类型">
                  <el-select v-model="form.docType" placeholder="">
                    <el-option label="WORD" value="1"/>
                    <el-option label="PDF" value="2"/>
                    <el-option label="PPT" value="3"/>
                    <el-option label="ZIP" value="4"/>
                  </el-select>
                </el-form-item>
              </el-col>


            </el-row>-->

      <el-row>
        <el-col :span="8">
          <el-form-item label="作者id">
            <el-input v-model="form.authorId"/>
          </el-form-item>
        </el-col>

        <el-col :span="16">
          <el-form-item label="作者名">
            <el-input v-model="form.author"/>
          </el-form-item>
        </el-col>
      </el-row>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

