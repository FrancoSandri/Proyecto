const express = require('express');
const app = express();
const morgan = require('morgan');
const CookieParser = require('cookie-parser');

//Settings
app.set('port', process.env.Port || 3000);
app.set('json spaces', 2);

//Midelware
app.use(morgan('devStart'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(CookieParser());

//Routes
app.use(require('./routes/index'));

//Starting Server
app.listen(app.get('port'), () => {         
    console.log(`Server on port ${app.get('port')}`);
}); 