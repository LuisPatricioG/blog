const jwt = require('jsonwebtoken');
const authorModel = require('../models/Authors');

const SECRET_KEY = "23qRIYhHnYQfZB1eiL14lL8Za/gkK5U7quK96age"

const verifyToken = async (req, res, next) => {
  const Authorization = req.get('Authorization');
  if(Authorization) {
    const token = Authorization.replace('JWT ','');
    const payload = jwt.verify(token,SECRET_KEY);
    const author = await authorModel.findById(payload._id)
      .catch((err) => res.status(401).json(err));
    if(!author) res.status(401).json({message: "User not found"});
    req.author = author
    next();
  }else{
    res.status(401).json({message:"Authorization header not provided"});
  }
};

module.exports = {
  verifyToken
};