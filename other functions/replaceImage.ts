import { Image } from '../resources/Image'
import { browserLaunch } from '../controller/browserLaunch'
import { login } from '../controller/login';

/**
    The image api could post an awkard image, so you can replace it manunally here by sending the post url
 */

const image: Image = new Image()
const replaceImage = async (postUrl: string) => {

    let browser = null;
    try {

        browser = await browserLaunch()
        const page = await browser.newPage();

        await login(page)

        await page.goto(postUrl);


        await page.waitForTimeout(2000)

        await image.downloadRandomImage()

        await page.click('[aria-label="Actions for this post"')

        await page.waitForTimeout(2000)

        await page.evaluate(() => {
            (document.querySelectorAll('.qzhwtbm6.knvmm38d')[7] as HTMLButtonElement).click() // click "edit post"

        });


        await page.waitForSelector('[aria-label="Remove post attachment"]')

        await page.click('[aria-label="Remove post attachment"]')

        await page.waitForTimeout(2000)
        const elementHandle = await page.$(`[multiple=""]`); // this is the selector for image input
        await elementHandle.uploadFile('./nature.jpg');

        await page.waitForTimeout(2000)
        await page.click('[aria-label="Save"]')

        await page.waitForTimeout(3000)

        await browser.close();
        image.deleteImage()

    } catch (error: any) {
        if (browser)
            await browser.close()
        console.error(error);
    }
};

export { replaceImage }
