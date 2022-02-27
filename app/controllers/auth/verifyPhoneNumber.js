import { verifyPhone } from "@common";

const User = require("@root/db/models").User

const sendVerificationCode = async (req, res) => {
    const {phoneNumber} = req.fields
    try {
        const user = req.user
        const phone = phoneNumber || user.phoneNumber
        //update phone number
        if (phoneNumber && user.phoneNumber != phoneNumber) {            
            await User.update(
                { phoneNumber: phone },
                {
                    where: { id: user.id},
                }
            )
        }
        //Send verification code
        const { success, error } = await verifyPhone.sendVerificationCode({ phoneNumber: phone, via: 'sms' })
        if (error) 
            res.status(400).send({ status: 0, error: error })
        else
            res.status(200).send({ status: 1 })
      } catch (error) {
        res.status(400).send({ status: 0, error: error })
      }
}

const checkVerificationCode = async (req, res) => {
    const {verificationCode} = req.fields;
    try {
        const user = req.user
        //Check verification code
        const { success, error } = await verifyPhone.checkVerificationCode({ phoneNumber: user.phoneNumber, verificationCode })
        if (error || !success)
            return res.status(400).send({ error: "InvalidVerificationCodeError" })        
        await User.update(
            { phoneVerified: true },
            {
                where: { id: user.id},
            }
        )
        user.phoneVerified = true
        res.status(200).send({ status: 1})
      } catch (error) {
        res.status(400).send({ status: 0, error: "InvalidVerificationCodeError" })
      }
}

export {
    sendVerificationCode,
    checkVerificationCode
}