import Image from '../models/image.js';

export const upload=async(req,res,next)=>{
	let image
	try{
		image=await Image.create({path:req.file.path,
							name:req.body.name,
							tags:req.body.tags,
							description:req.body.description});
		res.redirect('/previewer');
	}catch(e){
		res.end(e);
	}
}

export const getImagesAndTags=async(req,res,next)=>{
	const imgs=await Image.find();
	const tags= await getTags();
	console.log(tags);
	res.render('previewer',{images:imgs,tags:tags});
}

export const getTags=async(req,res,next)=>{
	const images=await Image.find();
	let imgMap={};
	for(let img of images){
		let tag=img['tags'];
		if(!imgMap[tag]){
			imgMap[tag]=1;
		}
		else{
			imgMap[tag]++;
		}
	}
	imgMap = Object.keys(imgMap).sort(function(a,b){return imgMap[b]-imgMap[a]});
	return imgMap.splice(0,3);
}