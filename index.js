const express = require('express');
const app = express();
const port = 8000;

const router = 
app.use('/', require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(`err while running the port : ${err}`);
        return;
    }
    console.log(`server is running perfectly on port : ${port}`);
})