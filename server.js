import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import multer from 'multer';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';
import path from 'path';
import crypto from 'crypto';
import config from './config';
import errorHandler from './middlewares/errorHandler.js';
import * as AuthController from './controllers/auth.js';
import * as ImageController from './controllers/images.js';

const app=express();
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/content')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
});
let upload = multer({ storage: storage });

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
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});

app.get('/',(req,res)=>{
	res.render('signin')
});
app.get('/signup',(req,res)=>{
	res.render('signup');
});
app.get('/previewer', ImageController.getImagesAndTags);

app.post('/',AuthController.signin);
app.post('/signup',AuthController.signup);
app.post('/previewer', upload.single('uploadedFile'), ImageController.upload);

app.use(errorHandler);