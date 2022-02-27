import jwt from 'jsonwebtoken'
import { JWT_EXPIRED_IN } from '@common/constants'

export default ({ id, expiredIn }, { subToken }) => {
  return jwt.sign({ id, subToken }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: expiredIn || JWT_EXPIRED_IN,
  })
}
