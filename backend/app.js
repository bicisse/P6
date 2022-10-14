
const express = require('express');
const fs = require('fs');

const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb+srv://bicisse:harrypotter@cluster0.rmvm8jt.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);
const saucesRouter = require('./routes/sauces');
app.use('/api/sauces', saucesRouter);




module.exports = app;
