const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3001;

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');

app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.options('/*', (req, res) => res.send());
app.use('/users',usersRouter);
app.use('/movies',moviesRouter);
app.listen(PORT,()=>console.log('server running on port '+PORT))