import { Router } from 'express'
import apiV1Route from './v1'
import passport from 'passport'
require('@common/passport')

const apiRoute = Router()

apiRoute.use(passport.initialize())
apiRoute.use(passport.session())

apiRoute.use('/v1', apiV1Route)

export default apiRoute