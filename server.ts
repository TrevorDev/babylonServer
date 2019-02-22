import * as express from "express"
import * as http from "http"
import * as puppeteer from "puppeteer"

var main = async()=>{
    // Basic server ---------------------------------------------------------------------------------
    var port = 3000;
    var app = express()
    app.set('view engine', 'pug')
    app.use("/public", express.static("public"))
    app.get('/', function (req, res) {
        var app = req.query.app ? req.query.app : 'testApp'
        res.render('app', { app: app })
    })
    var server = http.createServer(app)
    server.listen(port)
    console.log(`
    ____        __          __          _____                          
   / __ )____ _/ /_  __  __/ /___  ____/ ___/___  ______   _____  _____
  / __  / __ \`/ __ \\/ / / / / __ \\/ __ \\\__ \\/ _ \\/ ___/ | / / _ \\/ ___/
 / /_/ / /_/ / /_/ / /_/ / / /_/ / / / /__/ /  __/ /  | |/ /  __/ /    
/_____/\\__,_/_.___/\\__, /_/\\____/_/ /_/____/\\___/_/   |___/\\___/_/     
                  /____/                                                
    `);
    console.log("Serving at: localhost:"+port+"/pic.png")

    // Puppeteer ---------------------------------------------------------------------------------
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto("https://playground.babylonjs.com/frame.html#PN1NNI#1"); // Or localhost:3000

    // Fullscreen canvas element
    page.evaluate("document.getElementsByTagName('canvas')[0].style.zIndex=500")
    page.evaluate(" document.getElementsByTagName('canvas')[0].style.height='100%'")
    page.evaluate("document.getElementsByTagName('canvas')[0].style.position='absolute'")

    // Take a screenshot, save it locally and serve it to the requested webpage, need to wait a bit for the webpage to load before calling
    app.get('/pic.png', async (req, res) => {
        // Run JS on the webpage to modify the scene
        page.evaluate("BABYLON.Engine.LastCreatedScene.activeCamera.alpha = 1.4;")

        // Resize and send pic
        page.setViewport({width: 1920, height: 1080, deviceScaleFactor: 1});
        await page.screenshot({path: './public/example.png'});
        res.sendFile(__dirname+"/public/example.png")
    })
}
main();