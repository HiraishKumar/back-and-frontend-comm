require('dotenv').config();
const express = require('express')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler');
const router = require('./routers/routers');

const app = express()


app.use('/',router)

// app.get('/', (req,res)=>{
//     res.send('<h1>THIS THE ROOT ROUTE</h1>').status(200)
// })

app.use(express.json())
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
