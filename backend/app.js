
const express = require('express');
const fs = require('fs');
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.static('public'));

app.use(express.urlencoded({extended :true}));

app.set('view engine', 'ejs');



const apiRouter = require('./routes/api');
app.use('/api', apiRouter);
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);
const saucesRouter = require('./routes/sauces');
app.use('/api/sauces', saucesRouter);




module.exports = app;
