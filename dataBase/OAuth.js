const { Schema, model } = require('mongoose')


const OAuthSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    access_token:{
        type:String,
        require: true
    },
    refresh_token:{
        type:String,
        require:true
    }
})

module.exports = model('oauth', OAuthSchema)