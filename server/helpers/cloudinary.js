const cloudinary = require("cloudinary").v2;
const multer = require("multer");

//configure with env data
cloudinary.config({
  cloud_name: "dwnxzxkkw",
  api_key: "132197574588227",
  api_secret: "pvHtqOxveyeJz6cnq7EkfMC1WeE",
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadMediaToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      chunk_size: 16000000, // 16MB chunks
  timeout: 360000 // 6 minutes timeout
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading to cloudinary");
  }
};

const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
    throw new Error("failed to delete assest from cloudinary");
  }
};

module.exports = { upload, uploadMediaToCloudinary, deleteMediaFromCloudinary };
