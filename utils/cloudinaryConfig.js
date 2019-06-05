const {config,uploader} = require('cloudinary');

const cloudinaryConfig = (req,res,next) => {
  config({
    cloud_name:"luispatriciog" || process.env.CLOUDINARY_CLOUD_NAME,
    api_key:"226884377747987" || process.env. CLOUDINARY_API_KEY,
    api_secret:"aGxt95aTGw3Mn7l2pSQvhRk_uAw" || process.env.CLOUDINARY_API_SECRET
  });
  next();
};

module.exports = {cloudinaryConfig,uploader};