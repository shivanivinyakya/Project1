const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect("mongodb+srv://Rishabh:Rishabh3009@cluster0.pjvkl.mongodb.net/Project-1", {

mongoose.connect("mongodb+srv://Projectblog1:Roomno20@cluster0.vl9g6.mongodb.net/Rishabh",{
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected...oh yeahh..!!"))
.catch ( err => console.log(err) )
app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});