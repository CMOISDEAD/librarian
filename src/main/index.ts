import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import Store from 'electron-store'
import { schema } from './schema'
import icon from '../../resources/icon.png?asset'
import { PrismaClient } from '@prisma/client'

const store = new Store({ schema })
const prisma = new PrismaClient()

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

  const getBooks = async () => {
    const books = await prisma.book.findMany({
      include: {
        author: true,
        category: true
      }
    })
    return books
  }

  // handlers
  // TODO: Migrate all this logic to prisma and

  ipcMain.on('get-store', async (event) => {
    const authors = await prisma.author.findMany()
    const categories = await prisma.category.findMany()
    const books = await getBooks()
    const selected = await prisma.book.findFirst({
      where: { selected: true },
      include: {
        author: true,
        category: true
      }
    })
    event.returnValue = { authors, categories, books, selected }
  })

  ipcMain.on('get-authors', async (event) => {
    const authors = await prisma.author.findMany()
    event.returnValue = authors
  })

  ipcMain.on('get-author', async (event, id) => {
    const author = await prisma.author.findUnique({ where: { id } })
    event.returnValue = author
  })

  ipcMain.on('add-author', async (event, author) => {
    await prisma.author.create({ data: author })
    const all = await prisma.author.findMany()
    event.returnValue = all
  })

  ipcMain.on('delete-author', async (event, id) => {
    await prisma.author.delete({ where: { id } })
    const all = await prisma.author.findMany()
    event.returnValue = all
  })

  ipcMain.on('update-author', async (event, author) => {
    await prisma.author.update({
      where: {
        id: author.id
      },
      data: author
    })

    const authors = await prisma.author.findMany()
    event.returnValue = authors
  })

  ipcMain.on('save-selected', async (event, id) => {
    await prisma.book.updateMany({
      where: {
        selected: true
      },
      data: {
        selected: false
      }
    })
    const book = await prisma.book.update({
      where: {
        id
      },
      data: {
        selected: true
      },
      include: {
        author: true,
        category: true
      }
    })
    event.returnValue = book
  })

  ipcMain.on('get-selected', async (event) => {
    const book = await prisma.book.findFirst({
      where: {
        selected: true
      },
      include: {
        author: true,
        category: true
      }
    })
    event.returnValue = book
  })

  ipcMain.on('get-book', async (event, id) => {
    const book = await prisma.book.findUnique({ where: { id } })
    event.returnValue = book
  })

  ipcMain.on('get-books', async (event) => {
    const books = await getBooks()
    event.returnValue = books
  })

  ipcMain.on('add-book', async (event, book) => {
    const authorId = book.author
    console.log(authorId)
    delete book.author
    await prisma.book.create({
      data: {
        ...book,
        author: {
          connectOrCreate: {
            where: { name: authorId },
            create: {
              name: authorId
            }
          }
        },
        category: {
          connectOrCreate: {
            where: { name: book.category },
            create: {
              name: book.category
            }
          }
        }
      }
    })

    const books = await getBooks()
    event.returnValue = books
  })

  ipcMain.on('delete-book', async (event, id) => {
    await prisma.book.delete({ where: { id } })

    const books = await getBooks()
    event.returnValue = books
  })

  ipcMain.on('update-book', async (event, book) => {
    const id = book.id
    const author = book.author
    delete book.id
    delete book.authorId
    delete book.categoryId
    await prisma.book.update({
      where: {
        id
      },
      data: {
        ...book,
        author: {
          connectOrCreate: {
            where: { name: author },
            create: {
              name: author
            }
          }
        },
        category: {
          connectOrCreate: {
            where: { name: book.category },
            create: {
              name: book.category
            }
          }
        }
      }
    })

    const books = await getBooks()
    event.returnValue = books
  })

  ipcMain.on('get-categories', async (event) => {
    const categories = await prisma.category.findMany()
    event.returnValue = categories
  })

  //FIX: OLD METHODS still on use...
  ipcMain.on('save-books', (event, books) => {
    store.set('books', books)
    event.returnValue = store.get('books')
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

  // return the recents books
  ipcMain.on('get-recents', (event) => {
    event.returnValue = store.get('recents')
  })

  // add a recent book
  ipcMain.on('add-recent', (event, book) => {
    const recents: any = store.get('recents') || []
    const newRecents = recents.filter((r: any) => r.id !== book.id).slice(0, 5)
    store.set('recents', [book, ...newRecents])
    event.returnValue = store.get('recents')
  })

  // clear data
  ipcMain.on('clear-data', async (event) => {
    store.clear()
    event.returnValue = store.store
  })

  createWindow()

  app.on('activate', function () {
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
