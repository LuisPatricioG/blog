const postModel = require('../models/Posts');
const {uploader} = require('../utils/cloudinaryConfig');
const {dataUri} = require('../middlewares/multerUpload');

const listPosts = async (req,res) => {
	const posts  =  await postModel.find({is_active:true});
	// 200 = Ok
	return res.status(200).json(posts);
};

const listDeletedPosts = async (req,res) => {
	const posts = await postModel.find({is_active:false});
	// 200 = Ok
	return res.status(200).json(posts);
};

const createPost = async(req,res) => {
	const {_id} = req.author;
	req.body.author = _id;
	const post = await postModel.create(req.body)
		.catch(e => res.status(400).json(e));
	//201 = created
	res.status(201).json(post);
};

const getSinglePost = async (req, res) =>{
	const {id} = req.params;
	const post = await postModel.findOne({_id:id,is_active:true})
		.catch(e => res.status(400).json(e));
	if(!post) res.status(404).json({message:"Post not found"});
	res.status(201).json(post);
};

const updatePost = async (req, res) => {
	const {id} = req.params;
	const {_id} = req.author;
	const post = await postModel.findOneAndUpdate(
		{_id:id,is_active:true,author:_id},{...req.body},{new:true})
		.catch(e => res.status(400).json(e));
		if(!post) res.status(404).json({message:"Post not found"});
	res.status(201).json(post);
};

const deletePost = async (req, res) => {
	const {id} = req.params;
	const {_id} = req.author;
	const deletedPost = await postModel.findOneAndUpdate(
		{_id:id,is_active:true,author:_id},{is_active:false})
		.catch(e => res.status(400).json(e));
	if(!deletedPost) res.status(404).json({message:"Post not found"});
	res.sendStatus(204);
};

const postsUser = async(req, res) => {
	const {_id} = req.author;
	const posts = await postModel.find({is_active:true,author:_id})
		.catch(e => res.status(400).json(e));
	res.status(200).json(posts)
}

const uploadImage = async (req, res) => {
	if(req.file){
		const file = dataUri(req).content;
		const result = await uploader.upload(file)
			.catch((err) => res.status(400).json(err));
		const message = {"message":"Image uploaded succesfully", "url":result.url};
		res.status(200).json(message);
	};
};

module.exports = {
	listPosts,
	createPost,
	getSinglePost,
	updatePost,
	deletePost,
	postsUser,
	listDeletedPosts,
	uploadImage
};