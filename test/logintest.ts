import {login} from '../controller/login'
import { browserLaunch } from '../controller/browserLaunch'
import { connectDB } from './connectDB';



(async () => {
    connectDB()
    .then(async (con) => {
        const browser = await browserLaunch()
        const page = await browser.newPage();
        await login(page);
        await browser.close()
        console.log('logged in');
        
    });

})()

