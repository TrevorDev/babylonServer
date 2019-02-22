# BabylonJS Server
Capture images of a babylon scene (eg. GLTF model) from the server side

## How to run this project
Install:
[NodeJS](https://nodejs.org/en/)
[Git](https://git-scm.com/download/win)

Clone the repo, install packages and run
```
git clone https://github.com/TrevorDev/babylonServer
cd babylonServer
npm install
npm install webpack-cli -g
npm install webpack -g
npm install concurrently -g
npm install nodemon -g
webpack
npm run start
```
Open localhost:3000/pic.png in the browser


## Setup a Babylon scene you would like to render

Create a local server hosting the scene or use a playground eg. https://playground.babylonjs.com/#PN1NNI#1

## Using Puppeteer

Create a browser instance and load a webpage
```
const browser = await puppeteer.launch({});
const page = await browser.newPage();
await page.goto("https://playground.babylonjs.com/frame.html#PN1NNI#1"); 
```

Inject JS into the webpage
```
page.evaluate("BABYLON.Engine.LastCreatedScene.activeCamera.alpha = 1.4;");
```

Take a screenshot of the webpage
```
await page.screenshot({path: './public/example.png'});
```
## Configuring to use the GPU
Typical server virtual machines do not provide access to a GPU and when they do provide access, setting up the proper drivers can be difficult to grant access to puppeteer. One method that has worked was using an [Azure NV virtual machine running Windows and installing grid drivers](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/n-series-driver-setup#nvidia-grid-drivers).

Once the VM is setup puppeteer must be configured to run in non-headless mode so that it utilizes the GPU renderer.
```
// Don't disable the gpu
var args = puppeteer.defaultArgs().filter(arg => arg !== '--disable-gpu');
// Run in non-headless mode
args = args.filter(arg => arg !== '--headless');
// Use desktop graphics
args.push("--use-gl=desktop")
// Lanch pupeteer with custom arguments
const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: true,
    args
});
```
After this initial setup, follow the same steps as described out above

## Main dependencies
[BabylonJS](https://github.com/BabylonJS/Babylon.js) - For rendering
[Puppeteer](https://github.com/GoogleChrome/puppeteer) - To run/capture from chrome on the server side