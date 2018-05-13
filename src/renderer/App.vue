<template>
  <div id="app">
    <mu-appbar :style="{ width: drawer ? '75%' : '100%' }" style="-webkit-app-region: drag; float: right;transition: all .45s cubic-bezier(.23,1,.32,1)" :title="$route.meta.title">
      <mu-icon-button style="-webkit-app-region: no-drag" icon="menu" @click="drawer = !drawer" slot="left"/>
      <mu-icon-button @click="minimize" style="-webkit-app-region: no-drag" icon="minimize" slot="right"/>
      <mu-icon-button style="-webkit-app-region: no-drag" icon="close" slot="right"/>
    </mu-appbar>
    <mu-drawer style="width: 25%" :open="drawer" @close="drawer = false">
      <mu-appbar style="-webkit-app-region: drag; float: right;" title="人人视频">
      </mu-appbar>
      <mu-list :value="$route.path">
        <mu-list-item 
          v-for="(routes, idx) in $router.options.routes" 
          :key="idx" 
          :value="routes.path"
          v-if="routes.meta" 
          :title="routes.meta.title" 
          :describeText="routes.meta && routes.meta.describeText">
          <mu-icon slot="left" :value="routes.meta && routes.meta.icon"/>
        </mu-list-item>
      </mu-list>
      <mu-divider/>        
      <mu-list>
        <mu-list-item 
          title="设置">
          <mu-icon slot="left" value="settings"/>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <div style="float: right;transition: all .45s cubic-bezier(.23,1,.32,1)" :style="{ width: drawer ? '75%' : '100%' }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'

  export default {
    name: 'rr-fe-electron',
    data: () => {
      return {
        drawer: false
      }
    },
    methods: {
      minimize: function () {
        ipcRenderer.send('minimize')
      }
    }
  }
</script>

<style>
  body {
    font: caption;
    user-select: none;
  }
  * {
    cursor: default;
  }
  .mu-ripple-wrapper {
    cursor: pointer !important;
  }
  .scroll-table > div:nth-child(2)::-webkit-scrollbar {
    width: 5px;
    background: #ddd;
    border-radius: 15px
  }
  .scroll-table > div:nth-child(2)::-webkit-scrollbar-thumb {
    background: #BBB;
    border-radius: 15px
  }
</style>
