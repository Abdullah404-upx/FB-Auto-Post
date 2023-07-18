import mongoose from 'mongoose'
import { config } from 'dotenv' //?
config();

export { connectDB }

const connectDB = () => {
    return new Promise((res, rej) => {
        mongoose.connect(process.env.dbURI!)
            .then(async (con) => {
                res('connected to DB')
            }).catch(err => {
                rej(err)
            })


    })
}

