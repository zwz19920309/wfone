<template>
  <div class="fillcontain">
    <div class="mar10">
      <div class="pad10">
        <h4>场景: {{scene.name}}</h4>
      </div>
      <div class="pad10">
        <signon-list :callBack="callBcakHander" :isEdit="isEdit" :signonList="signonList"></signon-list>
      </div>
      <div class="pad10">
        <signon-list-dialog :signonList="dialogSignonList" :callBack="changeScenesign" ref="signonListRef"></signon-list-dialog>
      </div>
      <div class="pad10 t-right">
        <el-button type="primary"  @click="openSignOn">添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getSignonListBySceneId } from '@/api/getData'
export default {
  data () {
    return {
      isEdit: true,
      scene: {},
      signonList: [],
      dialogSignonList: []
    }
  },
  components: {
    'signon-list': () => import('@/components/signonList.vue'),
    'signon-list-dialog': () => import('@/components/signonListDialog.vue')
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let res = await getSignonListBySceneId({ sceneId: 13, type: 2 })
      if (res.status === 200) {
        this.signonList = res.data.list
        this.scene = res.data.scene
      }
    },
    changeScenesign () {
      console.log('@changeScenesign: -----')  
    },
    async openSignOn () {
     let res = await getSignonListBySceneId({ sceneId: 13, type: 1 })
      if (res.status === 200) {
        this.dialogSignonList = res.data.list
        this.$refs.signonListRef.open()
      }   
    },
    callBcakHander () {
      console.log('@callBcakHander: ------')  
    }
  }
}
</script>

<style lang="less">
</style>
