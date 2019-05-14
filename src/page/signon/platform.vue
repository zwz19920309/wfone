<template>
  <div class="fillcontain">
    <div class="mar10">
      <div class="mar10">
        <h3>新建平台</h3>
      </div>
      <div class="pad10">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="平台名称: ">
            <el-input v-model="platform.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="pad10">
        <el-button type="primary" @click="submit">确认提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addPlatForm } from '@/api/getData'
export default {
  data() {
    return {
      platform: { name: '' }
    }
  },
  methods: {
    async submit() {
      let res = await addPlatForm({ name: this.platform.name })
      if (res.status === 200) {
        this.$message({ message: '操作成功', type: 'success' })
      } else {
        this.$message.error('操作失败')
      }
      console.log('name: ', this.platform)
    }
  }
}
</script>
