const express = require('express');
const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({extended :true}));

app.set('view engine', 'ejs');

app.get('/api', (req, res)=>{
    console.log('Here');
    res.json({message : 'Did it'})
   
})


const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);
const saucesRouter = require('./routes/sauces');
app.use('/api/sauces', saucesRouter);
const userRouter = require('./routes/user-tests');
app.use('/users', userRouter);
app.listen(3000)

