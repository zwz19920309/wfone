<template>
  <div class="fillcontain">
    <div class="table_container">
      <!-- <div class="mar10">
        <div class="pad10">
          <el-table border :data="sceneList" stripe style="width: 100%">
            <el-table-column prop="name" label="名称"  width="180"></el-table-column>
            <el-table-column prop="note" label="描述"></el-table-column>
            <el-table-column prop="desc" label="活动详情" width="180">
              <template>
                <span><a>签到活动列表</a></span>
              </template>
             </el-table-column> 
            <el-table-column prop="createdAt" label="创建时间"></el-table-column>
            <el-table-column prop="desc" label="签到活动" width="180">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleSigonList(scope.$index, scope.row, 1)">添加</el-button>
                <el-button type="danger" size="mini" @click="handleSigonList(scope.$index, scope.row, 2)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <signon-list-dialog :signonList="signonList" :callBack="changeScenesign" ref="signonListRef"></signon-list-dialog>
      </div> 
      -->
      <div>
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
      if ((res.code === 0) && (res.data.list.length)) {
        this.sceneList = res.data.list
      }
    }
  }
}
</script>

<style lang="less">
</style>
