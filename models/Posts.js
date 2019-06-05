const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({

  title:{
    type:String
  },
  text:{
    type:String
  },
  author:{
    type:Schema.Types.ObjectId,
    ref:'authors'
  },
  image:{
    type:String
  },
  is_active:{
    type:Boolean,
    default:true
  }

},{timestamps:true,collection:'posts'});

module.exports = mongoose.model('posts',PostSchema);