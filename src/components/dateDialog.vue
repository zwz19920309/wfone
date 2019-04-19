<template>
  <el-dialog  title="时间选择" :visible.sync="dialogShow" append-to-body>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择开始日期" @change="changeStartAt" v-model="cDate.start_at" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="t-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择结束日期" @change="changeEndAt" v-model="cDate.end_at" style="width: 100%;"></el-date-picker>
        </el-col>
    </el-form-item>
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
  },
  data () {
    return {
      cDate: this.date || { start_at: '', end_at: '' },
      dialogShow: false
    }
  },
  created () {
  },
  methods: {
    changeStartAt (startAt) {
      this.cDate.start_at = startAt ? dateFormat(startAt, 'yyyy-MM-dd 00:00:00') : ''
    },
    changeEndAt (endAt) {
      this.cDate.end_at = endAt ? dateFormat(endAt, 'yyyy-MM-dd 00:00:00') : ''
    },  
    submit () {
      console.log('@submit: ', this.cDate)
      this.callBack && this.callBack(this.cDate)
    },
    open (params) {
      this.dialogShow = true
    },
    close () {
      this.dialogShow = false
    }
  },
  props: ['date', 'callBack'],
  watch: {
    'date': function (newVal, oldVal) {
      if (newVal) {
        this.cDate = newVal
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
