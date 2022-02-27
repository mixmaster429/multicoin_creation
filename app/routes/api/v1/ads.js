import { Router } from "express"
import asyncHandler from "express-async-handler"

import { getNewProject } from '@controller/ads'


const adsRoute = Router()

adsRoute.get("/newproject", asyncHandler(getNewProject))

export default adsRoute
