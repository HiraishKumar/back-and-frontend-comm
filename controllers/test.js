const Path = require("path")
const Product = require("../models/products")

const GetAllProd = async (req,res)=>{
    const {featured,name,fields,page,limit,sort,numericFilters} = req.query
    const queryobject ={}
    if (featured){
        queryobject.featured = featured === 'true' ? true : false
    }
    if (name){
        queryobject.name = {$regex:name,$options:'i'}
    }
    if (numericFilters){

    }       
    
    const result = Product.find(queryobject)
    if(sort){
        const SortList = sort.split(',').join(' ')
        result.sort(SortList)
    }
    else{
        result.sort('createdAt')
    }

    const product = await result
    res.status(200).json{
        product
    }
}

module.exports = {GetAllProd}