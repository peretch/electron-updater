// electron-updater module
const { autoUpdater } = require("electron-updater");
const { dialog } = require('electron');

// Configure log debugging
autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

// Disable auto download of updates
autoUpdater.autoDownload = false;

// Single export to check for and apply any available updates
module.exports = () => {

    // First check for updates
    autoUpdater.checkForUpdates();

    // Listen for update found
    autoUpdater.on('update-available', () => {

        // Promt user to strat download
        dialog.showMessageBox({
            type: 'info',
            title: 'Update avaukable',
            message: 'Hay una actualización disponible',
            buttons: ['Update', 'No']
        }, buttonIndex => {
            // If selected option in position 0 ('Update')
            if(buttonIndex  == 0 ){
                autoUpdater.downloadUpdate();
            }
        });
    });

    // Listen to download ready
    autoUpdater.on('update-downloaded', () => {
        // Promt to install aplication
        // Promt user to strat download
        dialog.showMessageBox({
            type: 'info',
            title: 'Update ready',
            message: 'Install and restart now?',
            buttons: ['Yes', 'Later']
        }, buttonIndex => {
            // If selected option in position 0 ('Update')
            if(buttonIndex  == 0 ){
                autoUpdater.quitAndInstall(false, true);
            }
        });
    });
}
