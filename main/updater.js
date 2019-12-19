// electron-updater module
const { autoUpdater } = require("electron-updater");

// Configure log debugging
autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

// Single export to check for and apply any available updates
module.exports = () => {

    // First check for updates
    autoUpdater.checkForUpdates();


}
