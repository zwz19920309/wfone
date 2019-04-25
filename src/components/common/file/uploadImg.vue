 
<template>
  <div class="upload-Img">
    <input
      class="uploadImg-com"
      v-on:change="uploadImgAction"
      ref="uploadImg"
      :id="id"
      type="file"
      accept="image/*"
    >
    <span class="upload-title" @click="autoupload">请上传</span>
  </div>
</template>

<script>    
export default {
  mounted() {

  },
  props: ['callBack', 'id'],
  methods: {
    uploadImgAction() {
      let that = this;
      let file = this.$refs.uploadImg.files[0];
      let fReader = new FileReader();
      fReader.readAsDataURL(file)
      fReader.onload = function (e) {
        that.callBack && that.callBack(file, e);
        that.clear();
      }
    },
    clear() {
      this.$refs.uploadImg.value = '';
    },
    autoupload() {
      document.getElementById(this.id).click();
    }
  },
  watch: {
  }
}
</script>

<style lang="less">
.upload-Img {
  width: 100%;
  height: 100%;
  position: relative;
  .uploadImg-com {
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
  }
  .upload-title {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -30px;
    margin-top: -13px;
    display: block;
    width: 60px;
    height: 26px;
    font-size: 14px;
    text-align: center;
    line-height: 26px;
  }
}
</style>

