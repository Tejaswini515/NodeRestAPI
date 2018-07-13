const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://nodeRest:'+ process.env.atlasPwd +'@noderest-fslrt.mongodb.net/test?retryWrites=true')

const countryRoute = require('./api/routes/countries');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/countries', countryRoute);

app.use((res,req,next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }

    next();
})

app.use((req,res,next) => {
    const error = new Error('Page Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res ,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;