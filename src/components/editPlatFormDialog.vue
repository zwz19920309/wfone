<template>
  <el-dialog title="编辑平台" :visible.sync="dialogShow">
    <div>
      <el-form :inline="true">
        <el-form-item label="名称">
          <el-input placeholder="请填写应用名称" v-model="cPlatForm.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="pad10 t-right">
      <el-button type="primary" @click="submit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      cPlatForm: this.platForm || { name: '' },
      dialogShow: false
    }
  },
  created() {
  },
  methods: {
    submit() {
      this.callBack && this.callBack(this.cPlatForm)
    },
    open(params) {
      this.dialogShow = true
    },
    close() {
      this.dialogShow = false
    }
  },
  props: ['platForm', 'callBack'],
  watch: {
    'platForm': function (newVal, oldVal) {
      if (newVal) {
        console.log('@platForm: ', newVal)
        this.cPlatForm = newVal
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
