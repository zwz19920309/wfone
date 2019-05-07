 
<template>
  <!-- <div class="upload-Img">
    <input
      class="uploadImg-com"
      v-on:change="uploadImgAction"
      ref="uploadImg"
      :id="id"
      type="file"
      accept="image/*"
    >
    <span class="upload-title" @click="autoupload">请上传</span>
  </div>-->
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
            console.log('@options: ', options)
            let that = this
            let file = options.raw
            console.log('@files: ', file)
            if (file) {
                this.fileReader.readAsDataURL(file)
            }          
            this.fileReader.onload = (e) => {
              console.log('@e: ', e)
                that.callBack && that.callBack(file, e)
                //let base64Str = this.fileReader.result.split(',')[1]
               // this.ruleForm.bankimg = base64Str
                //console.log('@base64Str: ', base64Str) 
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
