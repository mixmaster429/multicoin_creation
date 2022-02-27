import authRoute from "./auth"
import userRoute from "./user"
import tokensRoute from "./tokens"
import adsRoute from "./ads"

import { Router } from "express"

const apiV1Route = Router()

apiV1Route.use("/auth", authRoute)

apiV1Route.use("/users", userRoute)

apiV1Route.use("/tokens", tokensRoute)

apiV1Route.use("/ads", adsRoute)

export default apiV1Route
