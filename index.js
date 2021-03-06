const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser")
const {MONGOURL} = require('./config/keys')
const path = require('path');
const Port = process.env.PORT || 5000;

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());

mongoose.connect(MONGOURL,{useNewUrlParser: true, useUnifiedTopology: true});
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

if(process.env.NODE_ENV=="production"){
  app.use(express.static('client/build'));

  app.get("*", (req, res) =>{
    res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
  })
}

app.listen(Port, () => {
  console.log('server is running on port 5000 . . .');
})