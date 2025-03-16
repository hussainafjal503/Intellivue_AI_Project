require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs=require('fs');


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const dir=__dirname;
		const folder='images';
		const pathName=path.join(dir,folder);
		if(!fs.existsSync(pathName)){
			fs.mkdirSync(pathName);
			console.log(`folder created successfull...`);
		}

	  cb(null, pathName);
	},
	filename: function (req, file, cb) {
	  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
	  cb(null, file.originalname + '-' + uniqueSuffix)
	}
  });
  

  const fileFilter = (req, file, cb) => {
	// Allowed file types
	const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

	if (allowedTypes.includes(file.mimetype)) {
		// console.log(file.mimetype);
	  cb(null, true); // Accept file
	} else {
	  cb(new Error("Invalid file type. Only JPEG, PNG, JPG, and GIF are allowed."), false);
	}
  };
  
  // Initialize multer with file filter
  const upload = multer({
	storage: storage,
	fileFilter: fileFilter, // Apply file filtering
	// limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  });
  


//   const upload = multer({ storage: storage })



  cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
  });


  module.exports={
	cloudinary,
	upload
  }