<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <el-menu
          :default-active="defaultActive"
          style="min-height: 100%;"
          theme="dark"
          router
          @select="goToPath"
        >
          <!-- <el-menu-item index="manage">
            <i class="el-icon-menu"></i>首页
          </el-menu-item>-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>平台</span>
            </template>
            <el-submenu v-for="menu in menus" :key="menu.index" :index="menu.index">
              <template slot="title">{{menu.name}}</template>
              <el-menu-item
                v-for="submenu in menu.submenus"
                :key="submenu.index"
                :index="submenu.path"
              >{{submenu.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item index="platform">
              <span slot="title">新建</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <!-- <keep-alive> -->
        <router-view :key="$route.fullPath"></router-view>
        <!-- </keep-alive> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getPlatFormList } from '@/api/getData'
export default {
  data() {
    return {
      menus: [
        // {
        //   name: '金十', index: '1', submenus:
        //     [{ index: 1, path: 'sceneList?id=1', name: '应用' }, { index: 2, path: 'signonList?id=1', name: '模板' }, { index: 3, path: 'awardList?id=1', name: '奖品' }]
        // },
        // {
        //   name: '百度小程序', index: '2', submenus:
        //     [{ index: 1, path: 'sceneList?id=2', name: '应用' }, { index: 2, path: 'signonList?id=2', name: '模板' }, { index: 3, path: 'awardList?id=2', name: '奖品' }]
        // }
      ]
    }
  },
  computed: {
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    }
  },
  created() {
    this.initData(this.pageInfo)
  },
  methods: {
    async initData(params) {
      let res = await getPlatFormList({})
      if (res.status === 200) {
        this.menus = res.data.list
      }
    },
    async goToPath(params) {
      console.log('@click: goPath,', params)
      this.$router.push({ path: params })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../style/mixin";
</style>
