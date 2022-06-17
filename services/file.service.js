const fs = require('fs');
const path = require('path')

// fs.appendFile('./data.txt', 'HELLO NODE', (err)=>{
//     if(err){
//         console.log(err)
//     }
// })
//
// fs.writeFile('./data.txt', 'HELLO NODE', (err)=>{
//     if(err){
//     }
//         console.log(err)
//      })

// fs.readFile('./data.txt', (err, data)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log(data);
//     console.log(data.toString())
// })

// fs.readdir('./services', (err, files) => {
//     if(err){
//         console.log(err)
//         return
//     }
//     for (const file of files) {
//         console.log('********')
//         console.log(`services/${file}`)
//         console.log('********')
//
//         fs.stat(`./services/${file}`, (err1, stats)=>{
//             console.log(stats)
//         })
        // fs.readFile(`./services/${file}`, (err1, data)=>{
        //     if(err1){
        //         console.log(err1)
        //         return
        //     }
        //     console.log('_________________________')
        //     console.log(data.toString())
        //     console.log('_________________________')
        // })
//     }
// })

// fs.mkdir('./girls', (err)=>{
//     err && console.log(err)
// })

// fs.rename('./services/toMove.js', './utils/helloWorld.txt', (err1)=>{
//     err1 && console.log(err1)
// })





const sortFolder = (read, gender, write )=>{
    fs.readdir(path.join(read), (err3, files)=>{
        if(err3) return console.log(err3)

        files.forEach((file)=>{
            const folderPath = path.join(read ,file)

            fs.readFile(folderPath, (err4, data) => {
                if(err4) return console.log(err4)

                const user = JSON.parse(data.toString())
                if(user.gender === gender){
                    fs.rename(folderPath, path.join(write, file), err5 => {
                        if(err5) return console.log(err5)
                    } )
                }
            })
        })
    })
}

module.exports = {
    sortFolder,

}