import User from '../models/user.js';

export const signup=async(req,res,next)=>{
	const credentials=req.body;
	let user;

	try{
		user=await User.create(credentials);
	}catch({message}){
		res.locals.messages="User exists";
		res.render('signup');
		res.locals.messages=undefined;
	}
	
	res.render('previewer',{login: user.login});
}

export const signin=async(req,res,next)=>{
	const {email,password}=req.body;

	const user=await User.findOne({email});
	
	if(!user){
		res.locals.messages="User not found";
		res.render('signin');
		res.locals.messages=undefined;
		
	}

	try{
		const result=await user.comparePasswords(password);
	}catch(e){
		res.locals.messages="Wrong password";
		res.render('signin');
		res.locals.messages=undefined;
	}

	res.render('previewer',{login: user.login});
}