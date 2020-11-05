const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Port = 5000;
const cors = require('cors');

require('dotenv').config();



app.use(cors());
mongoose.connect(process.env.URL,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.connection.on('connected',() =>{
    console.log("connected to mongo");
})

mongoose.connection.on('error',(err) =>{
    console.log("error", err);
})


require('./models/product');
app.use(express.json());
app.use(require('./routes/product'));



app.listen(Port, () => {
  console.log('server is running on port 5000 . . .');
})