

let puppeteer: any;
let isHeadless = true

if(process.env.NODE_ENV=='development'){
    puppeteer = require('C:/Users/Abdullah404z/minis/node_modules/puppeteer/cjs-entry.js')
    isHeadless = false
}else{
    puppeteer = require('puppetter')
}


const browserLaunch = ()=> puppeteer.launch({
    headless: isHeadless,
    slowMo: 20,
    userDataDir: "./user_data",
    args: ["--no-sandbox", "--disable-notifications"],
}); 


export {browserLaunch}