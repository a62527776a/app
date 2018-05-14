<template>
  <div>
    <mu-content-block>
    <mu-raised-button primary label="新增" @click="dialog = true" />
    <!-- <mu-raised-button primary label="删除" @click="checkDelete" /> -->
    <mu-table 
      :fixedFooter="fixedFooter" 
      class="scroll-table" 
      :fixedHeader="fixedHeader" 
      :height="height"
      enableSelectAll multiSelectable
      selectable :showCheckbox="showCheckbox">
      <mu-thead slot="header">
        <mu-tr>
          <mu-th style="width: 10%" tooltip="标题">标题</mu-th>
          <mu-th style="width: 40%" tooltip="描述">描述</mu-th>
          <mu-th tooltip="按钮文本">按钮文本</mu-th>
          <mu-th tooltip="是否启用">是否启用</mu-th>
          <mu-th tooltip="操作">操作</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="(item,index) in tableData" :key="index" ref="tr">
          <mu-td style="width: 10%">{{item.title}}</mu-td>
          <mu-td style="width: 40%">{{item.desc}}</mu-td>
          <mu-td>{{item.btnText}}</mu-td>
          <mu-td>
            <mu-switch v-model="item.enable" @click.native.self="enableShareText(item)" />
          </mu-td>
          <mu-td>
            <mu-icon-button @click.native.stop="checkDialog(item, index)">
              <mu-icon value="delete" color="#BBB"/>
            </mu-icon-button>
          </mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    </mu-content-block>
    <mu-dialog :open="dialog" title="新建" @close="close">
      <mu-text-field required v-model="ShareText.title" hintText="标题" fullWidth/>
      <mu-text-field required v-model="ShareText.desc" hintText="描述" fullWidth/>
      <mu-text-field required v-model="ShareText.btnText" hintText="按钮文本" fullWidth/>
      是否启用<mu-switch style="float: right" v-model="ShareText.enable" />
      <mu-flat-button style="margin-right: 15px" primary slot="actions" @click="close" label="取消"/>
      <mu-raised-button primary slot="actions" @click="saveShareText" label="保存"/>
    </mu-dialog>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'share-text',
  data () {
    return {
      tableData: [],
      fixedHeader: true,
      fixedFooter: true,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: false,
      showCheckbox: true,
      height: '350px',
      dialog: false,
      initShareText: {
        title: '',
        desc: '',
        btnText: '',
        enable: false
      },
      ShareText: {
        title: '',
        desc: '',
        btnText: '',
        enable: false
      }
    }
  },
  methods: {
    getShareText: async function () {
      let shareText = await this.$root.$api.getShareText()
      this.tableData = shareText.data
      console.log(this.$router)
    },
    enableShareText: function (item) {
      this.$nextTick(() => {
        this.$root.$api.updateShareText({
          _id: item._id,
          enable: item.enable
        })
      })
    },
    checkDelete: async function () {
      let ids = []
      let items = []
      this.$refs.tr.forEach((item, idx) => {
        if (item.isSelected) {
          ids.push(this.tableData[idx].ids)
          items.push({
            '标题': this.tableData[idx].title,
            '描述': this.tableData[idx].desc,
            '按钮文本': this.tableData[idx].btnText
          })
        }
      })
      if (ids.length === 0) {
        ipcRenderer.send('notification', {
          title: '提示',
          body: '请选择一项'
        })
      } else {
        let clickResult = await this.$root.$util.deleteDialog(items, '确认删除以下几项？')
        if (clickResult === 0) this.deleteShareTextMore(ids)
      }
    },
    checkDialog: async function (item, idx) {
      let clickResult = await this.$root.$util.deleteDialog({
        '标题': item.title,
        '描述': item.desc,
        '按钮文本': item.btnText
      })
      // 0: 删除 1: 取消
      if (clickResult === 0) this.deleteItem(item, idx)
    },
    deleteItem: async function (item, idx) {
      const deleteResult = await this.$root.$api.deleteShareText(item._id)
      if (deleteResult.code === 200) {
        this.tableData.splice(idx, 1)
        ipcRenderer.send('notification', {
          title: '删除成功',
          body: JSON.stringify(item)
        })
      }
    },
    deleteShareTextMore: async function (ids) {
      const deleteResult = await this.$root.$api.deleteShareTextMore(ids)
      if (deleteResult.code === 200) {
        ids.forEach((id, idx) => {
          this.tableData.splice(idx, 1)
        })
        ipcRenderer.send('notification', {
          title: '提示',
          body: '删除成功'
        })
      }
    },
    close: function () {
      this.dialog = false
    },
    saveShareText: async function () {
      let saveResult = await this.$root.$api.saveShareText(this.ShareText)
      if (saveResult.code === 200) {
        this.dialog = false
        this.tableData.push(saveResult.data)
        this.ShareText = JSON.parse(JSON.stringify(this.initShareText))
      }
    }
  },
  created () {
    this.getShareText()
  }
}
</script>

<style lang="less">
@import "../../../node_modules/muse-ui/less/vars.less";

.mu-item.selected {
  // color: @primaryColor !important;
}

</style>
