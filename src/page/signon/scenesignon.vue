<template>
  <div class="fillcontain">
    <div class="mar10">
      <div class="pad10">
        <h4>场景: {{scene.name}}</h4>
      </div>
      <div class="pad10">
        <signon-list  :isDate="isDate" :dynamic="signonDynamic" :callBack="callBcakHander" :isEdit="isEdit" :signonList="signonList"></signon-list>
      </div>
      <div class="pad10">
        <signon-list-dialog  :isDate="isDate" :signonList="dialogSignonList"  ref="signonListRef"></signon-list-dialog>
      </div>
      <!-- <div class="pad10 t-right">
        <el-button type="primary"  @click="openSignOn(1)">添加</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getSignonListBySceneId, bulkAddScenesign, bulkDeleteScenesign } from '@/api/getData'
export default {
  data () {
    let that = this
    return {
      isEdit: true,
      isDate: true,
      sceneId: 0,
      scene: {},
      handleType: 1,
      signonList: [],
      dialogSignonList: [],
      signonDynamic: {
        actionbutton: [
          { label: '删除', type: 'danger', size: 'mini', action: async function (row) { that.deleteOneSceneSignon(row) } }
        ],
        bluckActionbutton: [
          { label: '添加活动', hide: false, type: 'primary', size: 'mini', action: async function () { that.openSignOn() } },
          { label: '批量删除', type: 'danger', size: 'mini', action: async function (data) { that.bulkDeleteSceneSignon(data) } }
        ]
      }
    }
  },
  components: {
    'signon-list': () => import('@/components/signonList.vue'),
    'signon-list-dialog': () => import('@/components/signonListDialog.vue')
  },
  created () {
    this.sceneId = this.$route.query.id
    this.initData({ sceneId: this.sceneId, type: 2 })
  },
  methods: {
    async initData (params) {
      params = params || { sceneId: this.sceneId, type: 2 }
      let res = await getSignonListBySceneId(params)
      if (res.status === 200) {
        this.signonList = res.data.list
        this.scene = res.data.scene
      }
    },
    async openSignOn () {
      let that = this
      let params = {
        actionbutton: [
          { label: '添加', type: 'primary', size: 'mini', action: async function (row) { that.addOneSignon(row) } }
        ],
        bluckActionbutton: [
          { label: '批量添加', type: 'danger', size: 'mini', action: async function (data) { that.bulkAddSignon(data) } }
        ]
      }
      let res = await getSignonListBySceneId({ sceneId: this.sceneId, type: 1 })
      if (res.status === 200 && res.data.list.length) {
        this.dialogSignonList = res.data.list
        this.$refs.signonListRef.open({ dynamic: params })
      } else {
        this.$message.error('暂无新活动模板')    
      }  
    },
    callBcakHander () {
      console.log('@callBcakHander: ------')  
    },
    async deleteOneSceneSignon (signon) {
      let data = [{ sceneId: this.sceneId, signonId: signon.id }]
      let res = await bulkDeleteScenesign({ scenesignons: data })
      if (res && res.status === 200) {
        this.$message({ message: '操作成功', type: 'success' })
        this.initData()
      } else {
        this.$message.error('操作失败')    
      }
    },
    async bulkDeleteSceneSignon (signonList) {
      if (!signonList || signonList.length < 1) {
        this.$message({ message: '操作成功', type: 'success' })
        return
      }
      let scenesignons = []
      signonList.forEach(signon => {
        scenesignons.push({ sceneId: this.scene.id, signonId: signon.id })
      })
      let res = await bulkDeleteScenesign({ scenesignons: scenesignons })
      if (res && res.status === 200) {
        this.$message({ message: '操作成功', type: 'success' })
        this.initData()
      } else {
        this.$message.error('操作失败')    
      }
    },
    async addOneSignon (signon) {
      if (!signon.start_at || !signon.end_at) {
        this.$message.error('请选择签到开始时间与结束时间')
        return
      }
      let data = [{ sceneId: this.sceneId, signonId: signon.id, startAt: signon.start_at, endAt: signon.end_at }]
      let res = await bulkAddScenesign({ scenesignons: data })
      if (res && res.status === 200) {
        this.$message({ message: '操作成功', type: 'success' })
        this.$refs.signonListRef.close()
        this.initData()
      } else {
        this.$message.error('操作失败')    
      }
    },
    async bulkAddSignon (signonList) {
      let isValid = true
      let scenesignons = []
      signonList.forEach(signon => {
        if (!signon.start_at || !signon.end_at) {
          isValid = false
        }
        scenesignons.push({sceneId: this.scene.id, signonId: signon.id, startAt: signon.start_at, endAt: signon.end_at})
      })
      if (!isValid) {
        this.$message.error('请选择签到开始时间与结束时间')
        return
      }
      let res = await bulkAddScenesign({ scenesignons: scenesignons })
      if (res && res.status === 200) {
        this.$message({ message: '操作成功', type: 'success' })
        this.$refs.signonListRef.close()
        this.initData()
      } else {
        this.$message.error('操作失败')    
      }
    }
  }
}
</script>

<style lang="less">
</style>
