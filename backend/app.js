const express = require('express');

const app = express();

app.use((req, res, next)=>{
    res.send('Second middleware responding');
});

module.exports = app;