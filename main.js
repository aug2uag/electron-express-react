'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = 'http://127.0.0.1:1987';
let child;

let mainWindow;

function windowRouter(_route) {
  return url + '/' + (_route || '');
}

function renderWindow() {
  mainWindow = new BrowserWindow({width: 1064, height: 680});
  //mainWindow.loadURL(windowRouter());
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // default to inspector mode in Chromium
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

function createWindow () {
  renderWindow();
  let exec = require('child_process').exec;
  child = exec('node ./server.js');
  child.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
  });
  child.stderr.on('data', function(data) {
      console.log('stdout: ' + data);
  });
  child.on('close', function(code) {
      console.log('closing code: ' + code);
      child.kill();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    child.kill();
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
