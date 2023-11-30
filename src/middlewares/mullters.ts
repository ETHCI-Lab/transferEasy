import multer, { FileFilterCallback } from 'multer'
import e, { Request } from 'express';
import path from "path";
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.originalname.endsWith('.pdf')) {
      const dir = path.join('/pdf',file.originalname);
      if (!fs.existsSync(dir)) {
        try {
          fs.mkdirSync(dir, { recursive: true });
        } catch (error) {
          console.log(error)
        }
      }
      cb(null, dir);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const multerFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (file.originalname.endsWith('.pdf')) {
    return callback(null, true)
  }
  return callback(null, false)
}

export const upload = multer({
  storage: storage,
  fileFilter: multerFilter
})