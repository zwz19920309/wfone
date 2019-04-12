<template>
  <el-dialog  title="编辑模板" :visible.sync="dialogShow">
    <el-form >
      <div>
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="模板名称">
            <el-input placeholder="请填写模板名称" v-model="cSignon.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="pad10"><span>签到类型：</span><checkin-type-list :callBack="changeCheckInType" :value="cSignon.checkinype"></checkin-type-list></div>
      <div class="pad10"><span>签到周期：</span><date-type-list :callBack="changeDateType" :type="cSignon.checkinype" :value="cSignon.datetype"></date-type-list></div>
      <div class="pad10" v-if="cSignon.datetype == 5">
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="自定义:">
            <el-input  v-model="cSignon.cycleNum"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="pad10">
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="场景描述">
            <el-input  type="textarea" :rows="5" style="width: 400px;"  placeholder="请填写描述" v-model="cSignon.rule_desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="pad10">
        <span>开始时间与结束时间：</span>
        <el-date-picker @change.native="changeUpDate"  value-format="yyyy-MM-dd"  format="yyyy 年 MM 月 dd 日"  v-model="cSignon.datePeriod" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="pad10 t-right">
        <el-button type="primary"  @click="submit">确认修改</el-button>
      </div>
     </el-form>  
  </el-dialog>
</template>

<script>
import { DATETYPEVALUE } from '@/common/common'
export default {
  components: {
    'checkin-type-list': () => import('@/components/checkinTypeList.vue'),
    'date-type-list': () => import('@/components/dateTypeList.vue')
  },
  data () {
    return {
      cSignon: { datePeriod: '', name: '', rule_desc: '', period: '', checkinype: 1, datetype: 1, cycleNum: '0' },
      dialogShow: false,
      cycleNum: 0
    }
  },
  created () {
  },
  methods: {
    changeCheckInType (data) {
      this.cSignon.checkinype = data.type
      this.cSignon.datetype = ''
    },
    changeDateType (data) {
      this.cSignon.datetype = data.type
    },
    changeUpDate (data) {
      console.log('@changeUpDate: ', data)
      this.cSignon.datePeriod = data
    },
    submit () {
      console.log('new--signOn: ', this.cSignon)
      this.callBack && this.callBack(this.cSignon)
    },
    open (params) { // 参数dynamic
      this.dynamic = params
      this.dialogShow = true
    },
    close () {
      this.dialogShow = false
    }
  },
  props: ['signon', 'callBack'],
  watch: {
    'signon': function (newVal, oldVal) {
      if (newVal) {
        this.cSignon = { name: newVal.name, rule_desc: newVal.rule_desc, checkinype: newVal.checkin_type.type, datetype: newVal.cycle_text.type }
        this.cSignon.cycleNum = this.signon.cycle_text.number ? this.signon.cycle_text.number : DATETYPEVALUE[this.signon.cycle_text.type]
        this.cSignon.datePeriod = [ this.signon.start_at, this.signon.end_at ]
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
