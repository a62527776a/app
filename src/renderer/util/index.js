const { dialog } = require('electron').remote

export default {
  deleteDialog: (item, message = '确认删除该项？') => {
    return new Promise((resolve, reject) => {
      dialog.showMessageBox({
        type: 'info',
        buttons: ['删除', '取消'],
        title: '警告',
        message: message,
        detail: JSON.stringify(item)
      }, (idx) => {
        // 点击按钮索引
        resolve(idx)
      })
    })
  }
}
