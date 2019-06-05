const authorModel = require('../models/Authors');
const {authenticate} = require('../utils/authenticate');
const {createToken} = require('../utils/generateToken');


const ListAuthors = async (req,res) => {
	const authors  =  await authorModel.find({is_active:true});
	// 200 = Ok
	return res.status(200).json(authors);
}

const ListDeactivatedAuthors = async (req,res) => {
	const authors = await authorModel.find({is_active:false});
	return res.status(200).json(authors);
};

const CreateAuthor = async(req,res) => {
	const author =  await authorModel.create(req.body)
		.catch(e => res.status(400).json(e));
	//201 = created
	res.status(201).json(author);
}

const getSingleAuthor = async (req, res) =>{
	const {id} = req.params;
	const author = await authorModel.findOne({_id:id,is_active:true})
		.catch(e => res.status(400).json(e));
	if(!author) res.status(404).json({message:"Author not found"});
	res.status(201).json(author);
};

const updateAuthor = async (req, res) => {
	const {id} = req.params;
	//... es spread object: copia los contenidos de un obejto en un nuevo objeto
	const author = await authorModel.findOneAndUpdate({_id:id,is_active:true},{...req.body},{new:true})
		.catch(e => res.status(400).json(e));
	if(!author) res.status(404).json({message:"Author not found"});
	res.status(201).json(author);
};

const deleteAuthor = async (req, res) => {
	const {id} = req.params;
	const deletedAuthor = await authorModel.findOneAndUpdate(
		{_id:id,is_active:true},{is_active:false})
		.catch(e => res.status(400).json(e));
	if(!deletedAuthor) res.status(404).json({message:"Author not found"});
	res.sendStatus(204);
};

const reactivateAuthor = async (req, res) => {
	const {username} = req.body;
	const Author = await authorModel.findOneAndUpdate(
		{username,is_active:false},{is_active:true},{new:true})
		.catch(e => res.status(400).json(e));
	if(!Author) res.status(404).json({message:"Author not found"});
	res.status(200).json(Author);
};

const login = (req, res) => {
	authenticate(req.body).then((user) => {
		if(!user) res.send(404).json({message:"User not found"});
		const token = createToken(user);
		res.status(200).json({token});
	}).catch((e) => res.sendStatus(400).json(e));
};


module.exports = {
	ListAuthors,
	ListDeactivatedAuthors,
	CreateAuthor,
	getSingleAuthor,
	updateAuthor,
	deleteAuthor,
	reactivateAuthor,
	login
}