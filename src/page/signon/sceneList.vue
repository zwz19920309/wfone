<template>
  <div class="fillcontain">
    <div class="table_container">
      <div>
        <signon-list-dialog :signonList="signonList" :callBack="changeScenesign" ref="signonListRef"></signon-list-dialog>
      </div>
      <div class="mar10">
        <scene-list :sceneList="sceneList"  :isEdit="isEdit" ref="sceneListRef"></scene-list>
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
      isEdit: true
    }
  },
  components: {
    'scene-list': () => import('@/components/sceneList.vue')
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let res = await getSceneList(this.params)
      console.log('@data: ', res)
      if ((res.status === 200) && (res.data.list.length)) {
        this.sceneList = res.data.list
      }
    },
    async handleSigonList (index, row, type) {
      this.scene = row
      this.handleType = type
      let res = await getSignonListBySceneId({ sceneId: this.scene.id, type: this.handleType })
      if ((res.status === 200) && (res.data.list.length)) {
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
