import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import Store from 'electron-store'
import { schema } from './schema'
import icon from '../../resources/icon.png?asset'
import { PrismaClient } from '@prisma/client'

const devdb = 'file:' + join(__dirname, '../../prisma/database.db')
const proddb = `file:${join(app.getPath('userData'), 'database.db')}`

const store = new Store({ schema })
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: is.dev ? devdb : proddb
    }
  }
})

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

  /*
   * HANDLERS
   */

  // TODO: divide all handlers in multiple files

  ipcMain.handle('get-store', async (_event) => {
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
    return { authors, categories, books, selected }
  })

  ipcMain.handle('get-authors', async (_event) => {
    const authors = await prisma.author.findMany()
    return authors
  })

  ipcMain.handle('get-author', async (_event, id) => {
    id = parseInt(id)
    const author = await prisma.author.findUnique({
      where: { id },
      include: {
        books: true
      }
    })
    return author
  })

  ipcMain.handle('add-author', async (_event, author) => {
    await prisma.author.create({ data: author })
    const all = await prisma.author.findMany()
    return all
  })

  ipcMain.handle('delete-author', async (_event, id) => {
    await prisma.author.delete({ where: { id } })
    const all = await prisma.author.findMany()
    return all
  })

  ipcMain.handle('update-author', async (_event, author) => {
    await prisma.author.update({
      where: {
        id: author.id
      },
      data: author
    })

    const authors = await prisma.author.findMany()
    return authors
  })

  ipcMain.handle('save-selected', async (_event, id) => {
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

    return book
  })

  ipcMain.handle('get-selected', async (_event) => {
    const book = await prisma.book.findFirst({
      where: {
        selected: true
      },
      include: {
        author: true,
        category: true
      }
    })
    return book
  })

  ipcMain.handle('get-book', async (_event, id) => {
    const book = await prisma.book.findUnique({ where: { id } })
    return book
  })

  ipcMain.handle('get-books', async (_event) => {
    const books = await getBooks()
    return books
  })

  ipcMain.handle('add-book', async (_event, book) => {
    const authorId = book.author
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
    return books
  })

  ipcMain.handle('delete-book', async (_event, id) => {
    await prisma.book.delete({ where: { id } })
    const recents = store.get('recents') as number[]
    recents.filter((r) => r !== id)
    store.set('recents', recents)

    const books = await getBooks()
    return books
  })

  ipcMain.handle('update-book', async (_event, book) => {
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
    return books
  })

  ipcMain.handle('get-categories', async (_event) => {
    const categories = await prisma.category.findMany({
      include: {
        books: true
      }
    })
    return categories
  })

  ipcMain.handle('get-pdf-path', async (_event) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Documents', extensions: ['pdf', 'docx', 'epub'] }]
    })
    if (!canceled) return filePaths[0]
    else return null
  })

  ipcMain.handle('clear-data', async (_event) => {
    store.clear()
    return store.store
  })

  const fetchRecents = async () => {
    const recents = store.get('recents') as number[]
    const books = await prisma.book.findMany({
      where: {
        id: {
          in: recents
        }
      },
      include: {
        author: true,
        category: true
      }
    })

    return books
  }

  ipcMain.handle('get-recents', async (_event) => {
    const books = await fetchRecents()
    return books
  })

  ipcMain.handle('add-recent', async (_event, id) => {
    const recents = store.get('recents') as number[]
    recents.filter((r) => r !== id)
    if (recents.length > 5) recents.shift()
    recents.push(id)
    store.set('recents', recents)

    return await fetchRecents()
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
