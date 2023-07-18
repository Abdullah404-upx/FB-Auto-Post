import { Image } from './resources/Image'
import { Ayat } from './resources/Ayat'


import { browserLaunch } from './controller/browserLaunch'
import { login } from './controller/login'
import { post } from './controller/post'
import { getRecoveryCodes } from './other functions/getRecoveryCode'

//const notifyMe = require('./mail.js')



const Ayah: Ayat = new Ayat()
const image: Image = new Image()

const postAyah = async () => {

    let ayah = Ayah.getAyah()
    let browser = null;

    try {

        browser = await browserLaunch()
        const page = await browser.newPage();

        await login(page);

        await page.waitForTimeout(2000)
    
        await image.downloadRandomImage()

        await page.waitForSelector(`._5xu4`, { timeout: 10000 })

        console.log("POSTING AYAH.....");

        await post(page, ayah)
        
        await page.waitForTimeout(1000);
        

        await browser.close();
        image.deleteImage()
        
    } catch (error: any) {
        if (browser)
            await browser.close()

        if (error.message == 'INSUFFICENIT_CODES') {
            getRecoveryCodes();

        }

        console.error(error);
    }
};

export { postAyah, Ayah }
