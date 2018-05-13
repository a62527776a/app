import { Notification } from 'electron'

export default (title, body) => {
  try {
    let notification = new Notification({
      title,
      body,
      silent: true
    })
    notification.show()
    let timer = setTimeout(() => {
      notification.close()
    }, 3000)
    notification.on('click', (e) => {
      clearTimeout(timer)
      notification.close()
    })
    notification.on('show', (e) => {
      console.log(21321)
    })
  } catch (e) {
    console.log(e)
  }
}
