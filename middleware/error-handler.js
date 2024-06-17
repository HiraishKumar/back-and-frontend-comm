
const errorHandlerMiddleware = (req,res,err,next) => {
    console.log(err)
    return res.json({messege:"An ERROR occured, please TRY AGAIn"}).status(500)
}

module.exports = errorHandlerMiddleware