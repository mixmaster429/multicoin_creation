import { Router } from 'express'
import cryptoV1Route from './v1'

const cryptoRoute = Router()

cryptoRoute.use('/v1', cryptoV1Route)

export default cryptoRoute