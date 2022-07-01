const twilio = require('twilio')

const { configs } = require('../constants/configs');
const client = require('twilio')(accountSid, authToken)


module.exports = {
    sendSMS: ()=>{
        const accountSid = TWILIO_ACCOUNT_SID;
        const authToken = '[AuthToken]';
        const client = require('twilio')(accountSid, authToken);

        client.messages
            .create({
                to: '+380673469772'
            })
            .then(message => console.log(message.sid))
            .done();
    }
}