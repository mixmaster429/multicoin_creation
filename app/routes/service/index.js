import { Router } from 'express'
import servicesV1Route from './v1'

const serviceRoute = Router()

serviceRoute.use('/v1', servicesV1Route)

export default serviceRoute