require('dotenv').config();
const express = require('express')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler');
const router = require('./routers/routers');

const app = express()

app.use(express.json())
app.use('/',router)
app.use(express.static('./public'))
app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 3000
const url = process.env.MONGO_URI 

const start = async ()=>{
    try {
        await connectDB(url)
        app.listen(port, (req,res)=>{
            console.log(`Server is listening on port ${port}...`)
        })    
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }    
}    

start();
