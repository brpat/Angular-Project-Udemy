const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json(post);
  });


app.use('/api/posts', (req, res, next)=>{
    const posts = [
        {
            id: '1234567',
            title:'Title',
            content:'Content'
        },
        {
            id: '12345678',
            title:'Title2',
            content:'Content2'
        }
    ];
    // will return automatically
    res.status(200).json({message: '', posts: posts});
});

module.exports = app;