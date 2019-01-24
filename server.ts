import * as express from "express"
import * as http from "http"
import * as puppeteer from "puppeteer"

var main = async()=>{

    // Basic server ---------------------------------------------------------------------------------
    var app = express()
    app.set('view engine', 'pug')
    app.use("/public", express.static("public"))
    app.get('/', function (req, res) {
        var app = req.query.app ? req.query.app : 'testApp'
        res.render('app', { app: app })
    })
    var server = http.createServer(app)
    server.listen(3000)
    console.log(`
    ____        __          __          _____                          
   / __ )____ _/ /_  __  __/ /___  ____/ ___/___  ______   _____  _____
  / __  / __ \`/ __ \\/ / / / / __ \\/ __ \\\__ \\/ _ \\/ ___/ | / / _ \\/ ___/
 / /_/ / /_/ / /_/ / /_/ / / /_/ / / / /__/ /  __/ /  | |/ /  __/ /    
/_____/\\__,_/_.___/\\__, /_/\\____/_/ /_/____/\\___/_/   |___/\\___/_/     
                  /____/                                                
`)

    // Puppeteer ---------------------------------------------------------------------------------
    // Enable GPU
    const args = puppeteer.defaultArgs().filter(arg => arg !== '--disable-gpu');
    args.push("--use-gl=desktop")    
    const browser = await puppeteer.launch({
        ignoreDefaultArgs: true,
        args
    });
    
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    const debugPage = await browser.newPage();
    await debugPage.goto('chrome://gpu');
    
    // /pic?width=1920&height=1080&camPosX=3&camPosY=5&camPosZ=5&camRotX=
    app.get('/pic.png', async (req, res) => {
        let servePage = page;
        if(req.query.debug){
            servePage = debugPage;
        }

        // Resize and send pic
        servePage.setViewport({width: 1920, height: 1080, deviceScaleFactor: 1});
        await servePage.screenshot({path: './public/example.png'});
        res.sendFile("C:/Users/trbaron/workspace/babylonServer/public/example.png")
    })
}
main();


// servePage.evaluate("BABYLON.Engine.LastCreatedScene.activeCamera.position.x+=3")
// var r = await servePage.evaluate(`
// var canvas = document.createElement('canvas');
// var gl;
// var debugInfo;
// var vendor;
// var renderer;

// try {
//   gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
// } catch (e) {
// }

// if (gl) {
//   debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
//   vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
//   renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
// }
// renderer

// `)
// console.log(r)
// await delay(4000);