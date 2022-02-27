import bcrypt from 'bcryptjs'
import { SALT_WORK_FACTOR } from '@common/constants'

export const hashPassword =  async (password) => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}

export const comparePassword = async (password, hashPassword) => {
  const hashedPassword = await bcrypt.compare(password, hashPassword)
  return hashedPassword
}