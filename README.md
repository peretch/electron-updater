# Electron-updater-example

This is an example of application made witn Nodejs, React, Nextjs and Electrón.
This project is seted to work in MacOS, using your own develop certification. For more information, you can follow [this](https://ioscodesigning.com/generating-code-signing-files/) link.


## Installation

1. clone repo
2. `npm install`
3. `npm run semantic:build`


## Develop
1. `npm start`


## Build
1. `npm run dist`

## Publish new release
1. Create a new release. 
(In this project, we use GitHub releases for pubishing new versions. To make a new release, you have to create a new Release in your project, called `vX.X.X` (for example, `v1.2.5`). This version must match with your `package.json`'s version, in order to run automatically.)
2. `GH_TOKEN={github_credentials} npm run release` (**IMPORTANT:** The github_credentials must have permissions to write and read repo. Remember to change the repository and build information in `package.json`).
3. Then, you will find your new version in `build/dist/mac/yourApp.app` (This is an example for Mac).

## Electron-logs
You can find your application logs on `~/Library/Logs/<your_app_name>/main.log`