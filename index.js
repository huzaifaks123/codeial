const express = require('express');
const app = express();
const port = 8000;

const router = 
app.use('/', require('./routes'))

app.set('view engine', 'ejs');
app.set('views', './views')

app.listen(port,function(err){
    if(err){
        console.log(`err while running the port : ${err}`);
        return;
    }
    console.log(`server is running perfectly on port : ${port}`);
})