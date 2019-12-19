// Native
const { join } = require('path');
const { format } = require('url');

// Packages
const { BrowserWindow, app, ipcMain } = require('electron');
const prepareNext = require('electron-next');
const updater = require('./updater');

const windowStateKeeper = require('electron-window-state');
const isDev = require('electron-is-dev');

let _APP_URL_ = 'http://localhost:8000/';

if (!isDev) {
  const serve = require('electron-serve');
  serve({ directory: 'build/next' });
  _APP_URL_ = 'app://-';
}

let mainWindow;

// Prepare the renderer once the app is ready
const createWindow = async () => {

  // Check for updates
  setTimeout( updater, 3000 );


  if (mainWindow === undefined) {
    await prepareNext('./renderer');
  }

  await app.whenReady();

  // Set default window dimensions
  const mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 800,
  });

  // Create main window
  mainWindow = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    x: mainWindowState.x,
    y: mainWindowState.y,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, 'preload.js'),
    },
  });

  await mainWindow.loadURL(_APP_URL_);

  // Remember window state
  mainWindowState.manage(mainWindow);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});
