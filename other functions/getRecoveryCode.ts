
import { browserLaunch } from '../controller/browserLaunch'
import { login } from '../controller/login'
import { Code } from '../resources/Code'


const getRecoveryCodes = async () => {
  let codes = []
  let browser = null;
  try {

    browser = await browserLaunch()

    const page = await browser.newPage();

    await login(page)


    await page.goto("https://m.facebook.com/security/2fac/factors/recovery-code/");
    await page.waitForTimeout(1000)


    //if already logged in but asking for password check
    await passwordCheckPoint(page)
    //====

    await page.click('#TwoFactorNBButton', { timeout: 10000 })
    await page.waitForTimeout(1000)



    let plainCodes = await page.evaluate(() => (Array.from(document.querySelector('._1-vy')!.children)).map((el: any) => el.innerText))
    plainCodes = plainCodes.filter((el: any, index: number) => index != 0) // first element is not a code

    for (let i = 0; i < plainCodes.length; i++) {
      codes.push({ 'code': plainCodes[i] })

    }

    await Code.deleteMany()

    await Code.create(codes)
    // saved? let's post one now
    await browser.close()
    console.log('codes saved successfully');

    return true

  } catch (error) {
    if (browser)
      await browser.close()

    console.error(error);
  }
};

export { getRecoveryCodes }


const passwordCheckPoint = async (page: any) => {
  let passwordCheck = await page.evaluate(
    () => document.querySelector("[placeholder='Password']") != null
  );

  if (passwordCheck) {
    console.log('password check point');
    await page.waitForSelector("[value='Continue']");

    await page.type("[placeholder='Password']", process.env.Pass);
    await page.click("[value='Continue']"); // type submit
    await page.waitForNavigation()
  }
}