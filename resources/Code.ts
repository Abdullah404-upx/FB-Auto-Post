

import mongoose from 'mongoose'
interface codeDoc extends mongoose.Document {
    code: {
        type: String;
        
    }
}

let codeSchema = new mongoose.Schema<codeDoc>({
    code: {
        type: String,
        required: true
    }

})

const Code = mongoose.model('Code', codeSchema);



// https://stackoverflow.com/questions/66052916/mongoose-property-password-does-not-exist-on-type-documentany

export {Code}

