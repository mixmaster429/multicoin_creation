import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { auth, adminAuth } from '@root/middleware/auth';
import { uploadHelpers } from '@root/common';
import { filterUsers, getUserInfo, changeUserVerification } from '@controller/user';
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = uploadHelpers.avatars();
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const fileName = uploadHelpers.fileName(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const userRoute = Router();

userRoute.get('/', asyncHandler(adminAuth), asyncHandler(filterUsers));

userRoute.get('/:id', asyncHandler(auth), asyncHandler(getUserInfo));

userRoute.get('/verification/:id', asyncHandler(adminAuth), asyncHandler(changeUserVerification));

export default userRoute;
