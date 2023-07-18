
import { join } from 'path'

const post = async (page: any, ayah: string) => {

  await page.click('._4g34._6ber')

  await page.waitForTimeout(2000);


  await page.type(`[aria-label="What's on your mind?"]`, " ");
  await page.evaluate((ayah: string) => {
    (document.querySelector(`[aria-label="What's on your mind?"]`) as HTMLInputElement)!
      .value += ayah;
  }, ayah);
  await page.type(`[aria-label="What's on your mind?"]`, " ")


  const elementHandle = await page.$("#photo_input");
  await elementHandle.uploadFile(join(__dirname, '..', '/nature.jpg'));


  page.on("dialog", async (dialog: any) => {
    await dialog.accept("Leave");
  });

  await page.waitForTimeout(3000)
  await page.evaluate(() => {
    (document.querySelector('[value="Post"]') as HTMLButtonElement).click()

  });

  return true
}
export { post }