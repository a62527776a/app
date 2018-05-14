import { autoUpdater, AppUpdater } from 'electron-updater'
import { app } from 'electron'

export default async () => {
  const version = app.getVersion()
  autoUpdater.checkForUpdatesAndNotify()
  AppUpdater.setFeedURL({
    token: '056329b6120df0d2a00060b8881998d40710af2a'
  })
  console.log(version, AppUpdater)
  let checkResult = await autoUpdater.checkForUpdatesAndNotify()
  console.log(checkResult)
}
