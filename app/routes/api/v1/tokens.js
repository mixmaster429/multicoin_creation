import { Router } from "express"
import asyncHandler from "express-async-handler"
import { auth } from '@root/middleware/auth'

import { 
    getFeaturedProject,
    addNewProject,
    acceptToken
 } from '@controller/coin'
import { filterTokens } from "@controller/coin"


const coinsRoute = Router()

coinsRoute.get("/featured", asyncHandler(getFeaturedProject))
coinsRoute.post(
    "/newproject",    
    asyncHandler(auth),
    asyncHandler(addNewProject)
)
coinsRoute.get(
    "/filterTokens",
    asyncHandler(auth),
    asyncHandler(filterTokens)
)
coinsRoute.post(
    "/acceptToken",
    asyncHandler(auth),
    asyncHandler(acceptToken)
)
export default coinsRoute
