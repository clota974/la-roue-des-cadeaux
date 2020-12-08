const electron = require('electron');

const { app, BrowserWindow } = electron;

let win;

app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('./pages/main.html');
})

app.on('window-all-closed', () => {
  app.quit();
})