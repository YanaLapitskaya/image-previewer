import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt-as-promised';

const ImageSchema=new Schema({
	path: String,
	name: String,
	tags: String,
	description: String
});

export default mongoose.model('Image',ImageSchema)
