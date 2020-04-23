const csv = require('csvtojson');
const path = require('path')




async function csvtojsonConverter(fileName){
    const data = await csv().fromFile(path.join(__dirname,`../data/${fileName}`))
    return data
}

module.exports = csvtojsonConverter