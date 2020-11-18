const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Port = 5000;
const cors = require('cors');
const bodyParser = require("body-parser")

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());

mongoose.connect(process.env.URL,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.connection.on('connected',() =>{
    console.log("connected to mongo");
})

mongoose.connection.on('error',(err) =>{
    console.log("error", err);
})

app.use(bodyParser.json())
app.use(express.json());
require('./models/product');
require('./models/user');

app.use(require('./routes/product'));
app.use(require('./routes/user'));


app.listen(Port, () => {
  console.log('server is running on port 5000 . . .');
})