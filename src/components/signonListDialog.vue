<template>
  <el-dialog  title="签到活动列表" :visible.sync="dialogShow">
    <div>
      <signon-list :isDate="isDate" :simplify="simplify" :dynamic="dynamic" :isEdit="isEdit" :signonList="cSignonList" ></signon-list>
    </div>
  </el-dialog>
</template>

<script>
import { getSignonList } from '@/api/getData'
export default {
  components: {
    'signon-list': () => import('@/components/signonList.vue')
  },
  data () {
    return {
      value: '',
      dialogShow: false,
      cSignonList: this.signonList || [],
      cData: [],
      dynamic: null,
      isEdit: true,
      simplify: true
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      if (!this.cSignonList.length) {
        let res = await getSignonList()
        if ((res.status === 200) && (res.data.list.length)) {
          this.cSignonList = res.data.list
        }
      }
    },
    handleSelectionChange (data) {
      this.cData = data
    },
    inSure () {
      this.callBack && this.callBack(this.cData)
    },
    open (params) {
      this.dynamic = params.dynamic
      this.isEdit = params.isEdit || this.isEdit
      this.dialogShow = true
    },
    close () {
      this.dialogShow = false
    }
  },
  props: ['callBack', 'signonList', 'isDate'],
  watch: {
    'signonList': function (newVal, oldVal) {
      this.cSignonList = newVal
    }
  }
}
</script>

<style lang="less">
.t-right {
  text-align: right;
}
</style>
