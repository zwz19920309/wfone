<template>
  <div class="fillcontain">
    <div class="table_container">
      <!-- <div>
        <signon-list-dialog :signonList="signonList" :callBack="changeScenesign" ref="signonListRef"></signon-list-dialog>
      </div> -->
      <div class="mar10 pad10">
        <h3>场景列表</h3>
      </div>
      <div class="mar10">
        <scene-list :callBack="callBackHanlder" :sceneList="sceneList"  :isEdit="isEdit" ref="sceneListRef"></scene-list>
        <div class="Pagination" style="text-align: left;margin-top: 10px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageInfo.page" :page-sizes="[10, 20, 30, 40]" :page-size="pageInfo.pageSize"
            layout="sizes, prev, pager, next, total"
            :total="pageInfo.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSceneList } from '@/api/getData'
export default {
  data () {
    return {
      scene: {},
      handleType: 0,
      sceneList: [],
      signonList: [],
      isEdit: true,
      pageInfo: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  components: {
    'scene-list': () => import('@/components/sceneList.vue')
  },
  created () {
    this.initData(this.pageInfo)
  },
  methods: {
    async initData (params) {
      let res = await getSceneList(params)
      if ((res.status === 200)) {
        this.sceneList = res.data.list
        this.pageInfo.total = res.data.total
      }
    },
    async callBackHanlder () {
      this.initData(this.pageInfo)
    },
    async handleSizeChange (data) {
      this.pageInfo.pageSize = data
      this.initData(this.pageInfo)
    },
    async handleCurrentChange (data) {
      this.pageInfo.page = data
      this.initData(this.pageInfo)
    },
    async handleSigonList (index, row, type) {
      this.scene = row
      this.handleType = type
      let res = await getSignonListBySceneId({ sceneId: this.scene.id, type: this.handleType })
      if ((res.status === 200)) {
        this.signonList = res.data.list
      } else {
        if (this.handleType === 1) {  
          this.$message.error('暂无新增签到活动模板')
        } else {
          this.$message.error('该场景尚未配置签到活动模板')
        }
        return
      }
      this.$refs.signonListRef.open()
    },
    async changeScenesign (signonList) {
      let scenesignons = []
      signonList.forEach(signon => {
        scenesignons.push([ this.scene.id, signon.id ])
      })
      let res
      if (this.handleType === 1) {
        res = await bulkAddScenesign({ scenesignons: scenesignons })
      } else {
        res = await bulkDeleteScenesign({ scenesignons: scenesignons })
      }
      if (res && res.status === 200) {
        this.$message({ message: '操作成功', type: 'success' })
        this.$refs.signonListRef.close()
      } else {
        this.$message.error('操作失败')    
      }
    }
  }
}
</script>

<style lang="less">
</style>
