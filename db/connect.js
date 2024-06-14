const mongoose = require('mongoose')

const connectDB = async (url) => {
    return mongoose
    .connect(url)
    .then(()=> {console.log('CONNECTED TO DATABASE')})
    .catch((error)=>{console.log(`FAILED TO CONNECT: ${error}`)})
}

module.exports = connectDB