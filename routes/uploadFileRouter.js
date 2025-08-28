import { Router } from 'express';
import upload from '../middlewares/fileUploadMiddleware.js';

const uploadFileRouter = Router();

uploadFileRouter.post('/uploadFile', upload.single('file'), (req, res) => {
  if (req.file) {
    return res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file
    });
  }
  res.status(400).json({
    message: 'No file uploaded'
  });
});

export default uploadFileRouter;