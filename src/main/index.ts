import { v4 as uuidv4 } from 'uuid'
import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import Store from 'electron-store'
import { schema } from './schema'
import icon from '../../resources/icon.png?asset'

const store = new Store({ schema })

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // check if the id passed is the selected book
  const checkSelected = (id: string) => {
    const slected: any = store.get('selected')
    return slected && slected.id === id
  }

  // handlers
  // save the books
  ipcMain.on('save-books', (event, books) => {
    store.set('books', books)
    event.returnValue = store.get('books')
  })

  // add a book
  ipcMain.on('add-book', (event, book) => {
    const books = store.get('books') || []
    book.id = uuidv4()
    store.set('books', [...books, book])
    event.returnValue = store.get('books')
  })

  // get all books
  ipcMain.on('get-books', (event) => {
    event.returnValue = store.get('books')
  })

  // delete the book
  ipcMain.on('delete-book', (event, book) => {
    const books = store.get('books') as any[]
    const newBooks = books.filter((b) => b.id !== book.id)
    store.set('books', newBooks)
    if (checkSelected(book.id)) {
      store.set('selected', null)
    }
    event.returnValue = {
      books: store.get('books'),
      selected: store.get('selected')
    }
  })

  // update the book
  ipcMain.on('update-book', (event, book) => {
    const books = store.get('books') as any[]
    const newBooks = books.map((b) => (b.id === book.id ? book : b))
    store.set('books', newBooks)
    if (checkSelected(book.id)) {
      store.set('selected', book)
    }
    event.returnValue = store.get('books')
  })

  // get the book by id
  ipcMain.on('get-book', (event, id) => {
    const books = store.get('books') as any[]
    const book = books.find((b) => b.id === id)
    event.returnValue = book
  })

  // save the recent books
  ipcMain.on('save-recent', (event, recent) => {
    store.set('recents', recent)
    event.returnValue = store.get('recents')
  })

  // manage the pdf path
  ipcMain.on('get-pdf-path', async (event) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Documents', extensions: ['pdf', 'docx', 'epub'] }]
    })
    if (!canceled) event.returnValue = filePaths[0]
    else event.returnValue = null
  })

  // save the selected book
  ipcMain.on('save-selected', (event, selected) => {
    store.set('selected', selected)
    event.returnValue = store.get('selected')
  })

  // return the selected book
  ipcMain.on('get-selected', (event) => {
    event.returnValue = store.get('selected')
  })

  // return the store
  ipcMain.on('get-store', (event) => {
    event.returnValue = store.store
  })

  // clear data
  ipcMain.on('clear-data', (event) => {
    store.clear()
    event.returnValue = store.store
  })

  createWindow()

  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
