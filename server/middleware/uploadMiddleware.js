const handleUpload = require('../config/cloudinaryConfig');

const  uploadMiddleware = async function (req) {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        return (cldRes);
      } catch (error) {
        throw error(error);
      }
}

module.exports = uploadMiddleware;
