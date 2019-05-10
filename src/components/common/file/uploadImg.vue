 
<template>
  <el-upload
    class="avatar-uploader"
    :auto-upload="false"
    :action="actionUrl"
    name="bankimg"
    :show-file-list="false"
    :on-change="changeAction"
  ></el-upload>
</template>

<<script>
export default {  
       data() {
            return {
              actionUrl:'',
              ruleForm: { bankimg:''}
            }
       },
       props: ['callBack'],
    mounted () {
    if (!window.FileReader) {
        console.error('Your browser does not support FileReader API!')
    }
    this.fileReader = new FileReader()
    },
    methods: {
      changeAction (options) {
        let that = this
        let file = options.raw
        if (file) {
          this.fileReader.readAsDataURL(file)
        }          
        this.fileReader.onload = (e) => {
          that.callBack && that.callBack(file, e)
        }
      }
    }
}
</script>
<style>
.avatar-uploader {
  width: 100%;
  height: 100%;
  position: relative;
}
.avatar-uploader .el-upload {
  width: 100%;
  height: 100%;
}
</style>
