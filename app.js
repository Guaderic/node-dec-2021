const {createUser} = require('./services/user.service');
const fileService = require('./services/file.service')

let user = createUser('Vova', 27);

console.log(user);
user.sayHello()