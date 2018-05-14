<template>
  <mu-content-block>
    <mu-list>
      <mu-sub-header>设置</mu-sub-header>
    </mu-list>
    <mu-divider/>
    <mu-list>
      <mu-sub-header>关于</mu-sub-header>
      <mu-avatar src="https://ss2.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/wisegame/wh%3D68%2C68/sign=d60177a95e66d0167e4c962eaf07e23f/d0c8a786c9177f3e88d308697ccf3bc79e3d56eb.jpg"  slot="leftAvatar" />
      <mu-list-item title="人人视频" describeText="指尖汇聚 世界精彩"/>
      <mu-list-item title="版本号" :describeText="version"/>
    </mu-list>
  </mu-content-block>
</template>

<script>
const { app } = require('electron').remote

export default {
  name: 'setting',
  data () {
    return {
      version: null
    }
  },
  methods: {
    getVersion: function () {
      app.getVersion()
    }
  },
  created () {
    this.version = app.getVersion()
    this.getVersion()
  }
}
</script>

<style lang="less">
.demo-paper {
  display: inline-block;
  height: 100px;
  width: 100px;
  margin: 20px;
  text-align: center;
  border-radius: 15px;
  img {
    height: 100%;
    width: 100%;
  }
}
</style>