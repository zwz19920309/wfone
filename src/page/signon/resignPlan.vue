<template>
  <div class="fillcontain">
    <div class="mar10">
      <div>
        <el-table border :data="resignDates" stripe style="width: 100%">
          <el-table-column label="补签日期">
            <template slot-scope="scope">
              <span>{{scope.row}}</span>
            </template>
          </el-table-column>
          <el-table-column label="补签消耗">
            <template slot-scope="scope">
              <span
                v-if="extraText.consumes && extraText.consumes.length"
              >{{extraText.consumes[0][scope.row]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="openPrizeList(scope.$index, scope.row, 1)"
              >添加</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="openPrizeList(scope.$index, scope.row, 2)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div>
      <div class="pad10">
        <el-button type="primary" @click="submit">确认提交</el-button>
      </div>
    </div>
    <prize-list-dialog
      :sizeChange="handleSizeChange"
      :currentChange="handleCurrentChange"
      :isEdit="isEdit"
      :total="total"
      :prizeList="prizeList"
      ref="prizeListRef"
    ></prize-list-dialog>
  </div>
</template>

<script>
import { getSignonById, getConsumesBySignonById, bulkAddConsumes, bulkDeleteConsumes } from '@/api/getData'
export default {
  data() {
    return {
      isEdit: true,
      total: 0,
      signOnId: 0,
      reDate: '',
      resignDates: [],
      prizeList: [],
      extraText: {}
    }
  },
  components: {
    'prize-list-dialog': () => import('@/components/prizeListDialog.vue')
  },
  created() {
    this.signOnId = this.$route.query.id
    this.initData({})
  },
  methods: {
    async initData() {
      let res = await getSignonById({ id: this.signOnId })
      if (res.status === 200) {
        this.resignDates = res.data.extra_text.resign.resignDates
        this.extraText = res.data.extra_text
        console.log('extraText: ', this.extraText)
        console.log('@resignDates: ', this.resignDates)
      }
    },
    async submit() {
      let res = await getSignonById({ id: 31 })
      if (res.status === 200) {
        this.$message({ message: '添加成功', type: 'success' })
      }
    },
    async getConsumesBySignon(params) {
      let res = await getConsumesBySignonById(params)
      if (res.status === 200) {
        if (!res.data.list || res.data.list.length < 1) {
          return false
        }
        this.prizeList = res.data.list
        this.total = res.data.total
      }
      return res
    },
    async openPrizeList(index, row, type) {
      this.type = type
      this.reDate = row
      this.pageInfo = { page: 1, pageSize: 10 }
      let res = await this.getConsumesBySignon({ id: this.signOnId, type: this.type, date: row })
      if (!res.data || !res.data.list.length) {
        this.type === 1 ? this.$message.error('暂无新奖品') : this.$message.error('未配置奖品')
        return
      }
      let that = this
      let changePrams = {
        btn_text: '添加',
        m_btn_text: '批量添加',
        type: 'primary'
      }
      if (this.type === 2) {
        changePrams = {
          btn_text: '删除',
          m_btn_text: '批量删除',
          type: 'danger'
        }
      }
      let params = {
        actionbutton: [
          { label: changePrams.btn_text, type: changePrams.type, size: 'mini', action: async function (row) { that.AddConsumes(row) } }
        ],
        bluckActionbutton: [
          { label: changePrams.m_btn_text, type: changePrams.type, size: 'mini', action: async function (data) { that.AddConsumes(data) } }
        ]
      }
      this.$refs.prizeListRef.open(params)
    },
    async AddConsumes(row) {
      let prizeIds = []
      if (row instanceof Array) {
        row.forEach(ele => {
          prizeIds.push(ele.id)
        })
      } else {
        prizeIds.push(row.id)
      }
      let res
      if (this.type === 1) {
        res = await bulkAddConsumes({ id: this.signOnId, prizeIds: prizeIds, date: this.reDate, type: 1 })
      } else {
        res = await bulkDeleteConsumes({ id: this.signOnId, prizeIds: prizeIds, date: this.reDate, type: 1 })
      }
      if (res.status === 200) {
        this.$message({ message: '操作成功', type: 'success' })
        this.$refs.prizeListRef.close()
        this.initData()
      } else {
        this.$message.error('操作失败')
      }
    },
    async handleSizeChange(data) {
      this.pageInfo.pageSize = data
    },
    async handleCurrentChange(data) {
      this.pageInfo.page = data
    }
  }
}
</script>

<style lang="less">
</style>
