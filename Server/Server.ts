import express from 'express'
import dotenv from 'dotenv'

import { Ayah } from '../Poster';
import * as handler from './serverHandler'
import { connectDB } from './connectDB';

dotenv.config()

// console.log(process.env.PEXAKEY, ' from server')

const app = express();
app.use(express.json());

//app.use(handler.checkAuth);

// monitor and control the bot
app.get('/', handler.HomePageRespnse)
app.get("/work", handler.postVerse)
app.get("/backup", handler.backupVerses)
app.get('/codes', handler.getCodes)
app.get('/recover-codes', handler.getRecoveryCode)
app.get('/replace-image', handler._replaceImage)



connectDB().then(()=>{

    app.listen(process.env.PORT || 3000, () => {
        console.log('Server is listening and got ..codes and and images are loaded successfully..')
    })

})

process.on("SIGTERM", () => {
    console.log('got a sigterm singal...saving the json file...');
    Ayah.saveAyats()
    console.log('ayats saved');
    console.log("shutting down...");
});
process.on('uncaughtException', () => {
    console.log('uncauhgeted excpetion');
    Ayah.saveAyats()
    console.log('ayats saved');
})

