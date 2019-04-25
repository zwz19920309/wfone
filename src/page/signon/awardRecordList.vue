<template>
  <div class="fillcontain">
    <div class="table_container">
      <div class="mar10 pad10">
        <h3>奖励记录</h3>
      </div>
      <div class="mar10">
        <el-table border :data="recordList" style="width: 100%">
          <el-table-column prop="uid" label="用户uid"></el-table-column>
          <el-table-column prop="prize_name" label="奖励名称"></el-table-column>
          <el-table-column prop="prize_note" label="奖励描述" width="250"></el-table-column>
          <el-table-column prop="created_at" label="奖励时间"></el-table-column>
        </el-table>
      </div>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageInfo.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfo.pageSize"
          layout="sizes, prev, pager, next, total"
          :total="pageInfo.total"
        ></el-pagination>
      </div>
      <div>
        <span @click="test">奖励</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getAwardRecordList, userSignon } from '@/api/getData'
export default {
  data() {
    return {
      isEdit: true,
      recordList: [],
      pageInfo: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  components: {
    'prize-list': () => import('@/components/prizeList.vue')
  },
  created() {
    this.initData(this.pageInfo)
  },
  methods: {
    async initData(params) {
      let res = await getAwardRecordList({ page: this.pageInfo.page, pageSize: this.pageInfo.pageSize })
      if (res.status === 200) {
        this.recordList = res.data.list
        this.pageInfo.total = res.data.total
      }
    },
    async handleSizeChange(data) {
      this.pageInfo.pageSize = data
      await this.initData(this.pageInfo)
    },
    async handleCurrentChange(data) {
      this.pageInfo.page = data
      await this.initData(this.pageInfo)
    },
    async test() {
      console.log('@test')
      await userSignon({ uid: '2312312', sceneId: '15' })
    }
  }
}
</script>

<style lang="less">
</style>
