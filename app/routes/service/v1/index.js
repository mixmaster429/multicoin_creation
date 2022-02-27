import verifyEmailRoute from "./verifyEmail"

import { Router } from "express"

const servicesV1Route = Router()

servicesV1Route.use("/verifyEmail", verifyEmailRoute)

export default servicesV1Route
