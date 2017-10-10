import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';
import path from 'path';

import config from './config';
import errorHandler from './middlewares/errorHandler.js'
import * as AuthController from './controllers/auth.js';

const app=express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

mongoose.Promise=bluebird;
mongoose.connect(config.database,err=>{
	if(err) throw err;
	console.log('Mongo connected');
})

app.listen(config.port, err=>{
	if(err) throw err;

	console.log(`Server listening on port ${config.port}`);
});

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	resave: true,
	saveUninitialized:true,
	secret: config.secret
}));

app.get('/',(req,res)=>{
	res.render('signin')
});
app.get('/signup',(req,res)=>{
	res.render('signup');
});

app.post('/signup',AuthController.signup);
app.post('/',AuthController.signin);

app.use(errorHandler);