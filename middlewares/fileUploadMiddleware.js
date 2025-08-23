// middlewares/fileUploadMiddleware.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Function to dynamically choose folder based on file type
function getFolderByMimeType(mimeType) {
  if (mimeType.startsWith('image/')) return './uploads/images';
  if (mimeType === 'application/pdf') return './uploads/pdfs';
  if (
    mimeType === 'application/msword' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) return './uploads/docs';
  return './uploads/others';
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dynamicFolder = getFolderByMimeType(file.mimetype);
    if (!fs.existsSync(dynamicFolder)) {
      fs.mkdirSync(dynamicFolder, { recursive: true });
    }
    cb(null, dynamicFolder);
  },
  filename: (req, file, cb) => {
    const filePath = path.join(getFolderByMimeType(file.mimetype), file.originalname);
    if (fs.existsSync(filePath)) {
      return cb(new Error('File already exists'), false);
    }
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

export default upload;
