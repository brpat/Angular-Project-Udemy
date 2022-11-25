const path = require('path');
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const postsRoutes =  require('./routes/posts');
const userRoutes = require('./routes/user');

mongoose.connect("mongodb+srv://admin7:ub10WKUszh4v@meanudemyproject.n8scu5d.mongodb.net/node-angular-course?retryWrites=true&w=majority")
.then(()=>{
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error(err);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Authorization");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,PUT, DELETE, OPTIONS');
    next();
});

// preflight error fix
// app.use((req,res,next)=>{
//     if(req.method == 'OPTIONS'){
//         res.status(200).json({});
//     }else{
//         next();
//     }
// })


//Added this to fix preflight error on put route
// app.options('*', function (req,res) { res.sendStatus(200); });


app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;