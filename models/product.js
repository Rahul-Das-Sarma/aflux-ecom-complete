const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
    title: {
    type:  String,
    required: true
    },
    photo:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

mongoose.model("Product", productSchema);