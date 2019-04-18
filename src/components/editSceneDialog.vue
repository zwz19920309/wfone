<template>
  <el-dialog  title="编辑场景" :visible.sync="dialogShow">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="名称">
        <el-input placeholder="请填写场景名称" v-model="cScene.name"></el-input>
      </el-form-item>
      <el-form-item label="场景描述">
        <el-input  type="textarea" :rows="5" style="width: 400px;"  placeholder="请填写描述" v-model="cScene.note"></el-input>
      </el-form-item>
      <!-- <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" @change="changeStartAt" v-model="cScene.start_at" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="t-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择时间" @change="changeEndAt" v-model="cScene.end_at" style="width: 100%;"></el-date-picker>
        </el-col>
    </el-form-item> -->
    </el-form>   
     <div class="pad10 t-right">
        <el-button type="primary"  @click="submit">确认</el-button>
      </div>
  </el-dialog>
</template>

<script>
import { dateFormat } from '@/common/utils/date-util'
export default {
  components: {
    'edit-scene-dialog': () => import('@/components/editSceneDialog.vue')
  },
  data () {
    return {
      cScene: this.scene || { name: '', note: '' },
      dialogShow: false,
    }
  },
  created () {
  },
  methods: {
    submit () {
      this.callBack && this.callBack(this.cScene)
    },
    open (params) {
      this.dialogShow = true
    },
    close () {
      this.dialogShow = false
    }
  },
  props: ['scene', 'callBack'],
  watch: {
    'scene': function (newVal, oldVal) {
      if (newVal) {
        this.cScene = newVal
      }
    }
  }
}
</script>

<style lang="less">
.t-right {
  text-align: right;
}

</style>
