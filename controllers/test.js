const Path = require("path")
const Product = require("../models/products")

const GetAllProd = async (req,res)=>{
    const {featured,name,page,limit,sort,priceGT,priceLT} = req.query
    const queryobject ={}
    if (featured){
        queryobject.featured = featured === 'true' ? true : false
    }
    if (name){
        queryobject.name = {$regex:name,$options:'i'}
    }
    if (priceGT || priceLT){
        queryobject.price = {
            $gte : priceGT || 0,
            $lte : priceLT || 500
        }
    }       
    
    const hasqueryparameters = Object.keys(queryobject).length > 0 || sort || priceGT || priceLT

    if(!hasqueryparameters){
        res.status(200).json({
            product:[],
            nnHits:0
        })
    }

    let result = Product.find(queryobject)

    if(sort){
        const SortList = sort.split(',').join(' ')
        result.sort(SortList)
    }
    else{
        result.sort('createdAt')
    }

    const Page = Number(page) || 1
    const Limit = Number(limit) || 10
    const Skip = (Page-1)*Limit

    result.skip(Skip).limit(Limit)

    const product = await result
    res.status(200).json({
        product , nbHits : product.length , page:Page
    })

}

module.exports = {GetAllProd}