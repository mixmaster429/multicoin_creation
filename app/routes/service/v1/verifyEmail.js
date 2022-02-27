import { Router } from "express"
import asyncHandler from "express-async-handler"

import { verifyEmail } from '@controller/emailVerification'


const verificationRoute = Router()

verificationRoute.get("/:token", asyncHandler(verifyEmail))

export default verificationRoute
