import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { auth } from '@root/middleware/auth'
import { uploadHelpers } from '@root/common'
import { 
  registerAccount,
  sendVerificationCode,
  checkVerificationCode,
  login,
  getMe
} from '@controller/auth'
import { sendEmail } from '@controller/emailVerification'

const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = uploadHelpers.avatars()
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    const fileName = uploadHelpers.fileName(file.originalname)
    cb(null, fileName)
  },
})

const upload = multer({ storage: storage })

const authRoute = Router()

authRoute.post(
  "/register",
  asyncHandler(registerAccount)
)

authRoute.post(
  "/sendEmailVerification",
  asyncHandler(auth),
  asyncHandler(sendEmail)
)

authRoute.post(
  '/sendVerificationCode',
  asyncHandler(auth),
  asyncHandler(sendVerificationCode)
)

authRoute.post(
  '/checkVerificationCode',
  asyncHandler(auth),
  asyncHandler(checkVerificationCode)
)

authRoute.post(
  '/login',
  asyncHandler(login)
)

authRoute.get(
  '/me',
  asyncHandler(auth),
  asyncHandler(getMe)
)
export default authRoute