import multer, { FileFilterCallback } from 'multer'
import e, { Request } from 'express';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.originalname.endsWith('.glb') || file.originalname.endsWith('.gltf')) {
      cb(null, 'assets/root/model')
    }else if (file.originalname.endsWith('.png') || file.originalname.endsWith('.jpg')) {
      cb(null, 'assets/root/material')
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const multerFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (file.originalname.endsWith('.glb') || file.originalname.endsWith('.gltf')) {
    return callback(null, true)
  }else if (file.originalname.endsWith('.png') || file.originalname.endsWith('.jpg')) {
    return callback(null, true)
  }
  return callback(null, false)
}

export const upload = multer({
  storage: storage,
  fileFilter: multerFilter
})