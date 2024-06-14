const notFound = (req,res)=>{
    res.send('Page Not Found')
    .status(404)
}

module.exports = notFound