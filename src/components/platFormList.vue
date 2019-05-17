<template>
  <div class="fillcontain">
    <div class="mar10">
      <el-table border :data="cPlatFormList" stripe style="width: 100%">
        <el-table-column type="selection" width="55" v-if="isEdit"></el-table-column>
        <el-table-column prop="id" label="平台id"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="desc" label="操作" width="180" v-if="isEdit">
          <template slot-scope="scope">
            <el-button
              v-for="(item, key) in cDynamic.actionbutton"
              :key="key"
              :type="item.type"
              :size="item.size"
              @click="func(item.action, scope.row)"
            >{{ item.label }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pad10 t-right" v-if="isEdit">
      <el-button
        v-for="(item, key) in cDynamic.bluckActionbutton"
        :key="key"
        :type="item.type"
        :size="item.size"
        @click="func(item.action)"
      >{{ item.label }}</el-button>
    </div>
    <edit-platform-dialog :callBack="handleEdit" :platForm="platForm" ref="editPlatFormRef"></edit-platform-dialog>
    <edit-platform-dialog :callBack="handleCreate" :platForm="newPlatForm" ref="createPlatFormRef"></edit-platform-dialog>
  </div>
</template>

<script>
import { updatePlatForm, addPlatForm } from '@/api/getData'
export default {
  components: {
    'edit-platform-dialog': () => import('@/components/editPlatFormDialog.vue')
  },
  data() {
    let that = this
    return {
      platForm: {},
      newPlatForm: { name: '' },
      cPlatFormList: [] || this.platformList,
      cDynamic: this.dynamic || {
        actionbutton: [
          { label: '编辑', type: 'primary', size: 'mini', action: async function (row) { that.editAction(row) } },
          { label: '删除', type: 'danger', size: 'mini', action: async function (row) { } }
        ],
        bluckActionbutton: [
          { label: '新建平台', type: 'primary', size: 'mini', action: async function () { that.createAction() } },
          { label: '批量删除', type: 'danger', size: 'mini', action: async function () { } }
        ]
      }
    }
  },

  methods: {
    async func(func, data) {
      func && func(data)
    },
    async editAction(row) { // 编辑
      this.platForm = Object.assign({}, row)
      this.$refs.editPlatFormRef.open()
    },
    async createAction(row) { // 编辑
      this.$refs.createPlatFormRef.open()
    },
    async handleCreate(data) {
      let res = await addPlatForm(data)
      if (res.status === 200) {
        this.$message({ message: '添加成功', type: 'success' })
        this.$refs.createPlatFormRef.close()
        this.callBack && this.callBack(res)
      } else {
        this.$message.error('操作失败')
      }
    },
    async handleEdit(data) {
      console.log('editData: ', data)
      let res = await updatePlatForm(data)
      if (res.status === 200) {
        this.$message({ message: '修改成功', type: 'success' })
        this.$refs.editPlatFormRef.close()
        this.callBack && this.callBack(res)
      } else {
        this.$message.error('操作失败')
      }
    },
  },
  props: ['platFormList', 'isEdit', 'callBack', 'dynamic'], // isEdit false: 只显示：true: 可操作
  watch: {
    'platFormList': function (newVal, oldVal) {
      console.log('@neVal-platFromList: ', newVal)
      this.cPlatFormList = newVal
    }
  }
}
</script>