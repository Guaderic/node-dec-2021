// const {sendSms} = require('./message.service');
const SMS = require('./message.service');
function createUser( name, age){
    SMS.sendSms('Welcome on board', '7981402')
    return{
        name,
        age,
        sayHello: ()=>{
            console.log(`Hello my name is ${name} and I'm ${age} years old`)
        }
    }
}

module.exports = {
    createUser
}