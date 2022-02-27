import PhoneNumber from "google-libphonenumber"
import axios from "axios"
import { VERIFICATION_CODE_LENGTH } from "@root/common/constants"
const apiURL = "https://api.authy.com/protected/json/phones/verification/"

const sendVerificationCode = async ({ phoneNumber, via }) => {
  try {
    const phoneUtil = PhoneNumber.PhoneNumberUtil.getInstance()
    const number = phoneUtil.parseAndKeepRawInput(phoneNumber)
    const data = {
      api_key: process.env.TWILLIO_VERYFY_API_KEY,
      phone_number: number.getNationalNumber(),
      via: via,
      country_code: number.getCountryCode(),
      code_length: VERIFICATION_CODE_LENGTH,
    }
    const response = await axios.post(`${apiURL}start`, data)
    return { success: response.data && response.data.success }
  } catch (error) {
    return { error: "InvalidPhoneError" }
  }
}

const checkVerificationCode = async ({ phoneNumber, verificationCode }) => {
  try {
    const phoneUtil = PhoneNumber.PhoneNumberUtil.getInstance()
    const number = phoneUtil.parseAndKeepRawInput(phoneNumber)
    const data = {
      api_key: process.env.TWILLIO_VERYFY_API_KEY,
      phone_number: number.getNationalNumber(),
      verification_code: verificationCode,
      country_code: number.getCountryCode(),
    }
    const response = await axios.get(`${apiURL}check`, { params: data })
    return { success: response.data && response.data.success }
  } catch (error) {
    return { error: error }
  }
}

export default {
  sendVerificationCode,
  checkVerificationCode,
}
