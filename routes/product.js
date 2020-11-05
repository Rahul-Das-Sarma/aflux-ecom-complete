const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = mongoose.model("Product");


router.post('/addnewproducts', (req, res) => {
    const {title, pic, price, category, description} = req.body;
    if(!title || !pic || !price || !category){
        return   res.status(422).json({error: "Please add all the fields"}) 
    }
    const product = new Product({
        title,
        photo : pic,
        price,
        category,
        description
    })
    product.save().then(result=> {
        res.json({product: result})
        console.log(result)
    }).catch(err => {console.log(err)})
})

router.get('/', (req, res) => {
   Product.find().then(data => res.json(data))
   .catch(err => console.log(err))
})

router.get('/mens', (req, res)=> {
    Product.find({category:"men clothing"})
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

router.get('/womens', (req, res)=> {
    Product.find({category:"women clothing"})
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

router.get('/electronics', (req, res)=> {
    Product.find({category:"electronics"})
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

//?id=${itemId}&type=single
router.get('/item_by_id', (req, res) => {
    let type = req.query.type
    let itemId = req.query.id

    Product.find({'_id': {$in : itemId}}).then(data=> res.json(data)).catch(err=> console.log(err))

})





module.exports = router;