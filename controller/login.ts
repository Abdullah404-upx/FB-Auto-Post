import { Code } from '../resources/Code'

export { login }

// crap
const login = async (page: any) => {

  await page.setDefaultNavigationTimeout(1000000);
  await page.setViewport({ width: 1000, height: 600 });

  await page.goto("https://m.facebook.com");

  let notloggedIn = await page.evaluate(
    () => document.querySelector("#m_login_password") != null
  );

  if (notloggedIn) {

    await page.evaluate(() => { // accept cookies if requested
      if (document.querySelector("#accept-cookie-banner-label")) {
        (document.querySelector("#accept-cookie-banner-label") as HTMLButtonElement).click();
      }
    });

    await page.type("#m_login_email", process.env.EMAIL); //email
    await page.type("#m_login_password", process.env.PASS); //pass
    await page.click(`[name="login"]`); // type submit
    await page.waitForNavigation();

    // if using 2-factor-authentication
    await _2fAuth(page)


  }

}



const _2fAuth = async (page: any) => {

  let _2fAuth = await page.evaluate(() => {
    return document.querySelector('[name="approvals_code"');
  });

  // request to enter code?
  if (_2fAuth) {

    let code: string;
    if (await Code.count() <= 1) throw new Error('INSUFFICENIT_CODES')
    else { code = (await Code.findOneAndDelete({})).code }

    await page.type('[name="approvals_code"', code); // submit code
    await page.click('[value="Submit Code"]');
    await page.waitForTimeout(2000);


    let reviewRenctLoging = await page.evaluate(() => {
      return document.querySelector('[name="submit[Continue]"]') != null;
    });
    if (reviewRenctLoging) await page.click('[name="submit[Continue]"]');

    let thisWasMe = await page.evaluate(() => {
      return document.querySelector('[value="This Was Me"]') != null;
    });
    if (thisWasMe) await page.click('[value="This Was Me"]');

    // save broswer? contine


    let saveBroswer = await page.evaluate(
      () => document.querySelector('[value="Continue"]') != null
    );
    if (saveBroswer) await page.click('[name="submit[Continue]"]');


    reviewRenctLoging = await page.evaluate(() => {
      return document.querySelector('[name="submit[Continue]"]') != null;
    });
    if (reviewRenctLoging) await page.click('[name="submit[Continue]"]');

    thisWasMe = await page.evaluate(() => {
      return document.querySelector('[value="This Was Me"]') != null;
    });
    if (thisWasMe) await page.click('[value="This Was Me"]');


    let again = await page.evaluate( // save broswer?
      () => document.querySelector('[value="Continue"]') != null
    );
    if (again) await page.click('[name="submit[Continue]"]');

  }
}