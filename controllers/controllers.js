const Product = require("../models/products")

const getRoot = (req,res) =>{
    res.json({messege:"ROOT ROUTE"}).status(200)
}


const getViewcart = (req,res) =>{
    res.send({messege:"VIEW CART ROUTE"}
    ).status(200)
}

const getSearch = (req,res) =>{
const {name} = req.query
if (name) {
    res.send({
        messege:"SEARCH ROUTE",
        location:`the name is : ${name}`
    }).status(200)
}
    res.send({messege:"SEARCH ROUTE"}).status(200)
}


const getSearchitem = async (req,res) =>{
    const {featured,name,sort,fields,page,limit,numericFilters } = req.query
    const queryObject = {}
    
    if (featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if (name){
        queryObject.name = {$regex : name, $options:'i'}
    }
    if (numericFilters) {
        const operatorMap = {
          '>': '$gt',
          '>=': '$gte',
          '=': '$eq',
          '<': '$lt',
          '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
          regEx,
          (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
          const [field, operator, value] = item.split('-');
          if (options.includes(field)) {
            queryObject[field] = { [operator]: Number(value) };
          }
        });
      }

      const hasQueryParameters = Object.keys(queryObject).length > 0 || sort || fields || page || limit;

      // If no query parameters are present, return an empty response
      if (!hasQueryParameters) {
          return res.status(200).json({
              product: [],
              nbHits: 0
          });
      }

    // console.log(queryObject)
    let result = Product.find(queryObject)
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else{
        result.sort('createdAt')
    }

    if (fields) {
        const fieldList = fields.split(',').join(' ')
        result.select(fieldList)
    } 

    const Page = Number(page) || 1
    const Limit = Number(limit) || 10
    const skip = (Page-1)*Limit

    result.skip(skip).limit(Limit)

    const product = await result
    // sending the test html file
    // res.sendFile('website/store-api/public/test.html')
    res.status(200).json({
        product , nbHits : product.length  
    })
}


module.exports = {
    getRoot,getSearch,getViewcart,getSearchitem
}