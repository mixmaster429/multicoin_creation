import { sendMailService, getSourcePath } from "@common"
const path = require('path');
import { VERIFICATION_EMAIL_TOKEN_EXPIRED_IN } from "@common/constants"
import { generateJWTToken } from "@common"

const createToken = async (userId) => {
  const token = await generateJWTToken(userId, VERIFICATION_EMAIL_TOKEN_EXPIRED_IN)
  return token.token
}

const sendEmail = async (req, res) => {
    const email = req.fields.email;
    const htmlPath = path.resolve(getSourcePath(), 'views', 'email', 'verificationEmail.html.pug');
    try {
      const user = req.user
      const token = await createToken(user.id);
      await sendMailService({
        pathEmail: htmlPath,
        dataEmail: {
          welcome: 'Welcome',
          description: 'Thanks for your invitation.',
          verifyTitle: 'Verify your email',
          verifyLink: `${process.env.SITE_URL}/services/v1/verifyEmail/${token}`,
        },
        email: email,
        title: `Please verify your account`,
      })
      res.status(200).send({status: 1, link: `${process.env.SITE_URL}/services/v1/verifyEmail/${token}`})
    } catch(e) {
      console.log(e)
      res.status(400).send({error: "Failed sending email"})
    }
}

export {
    sendEmail
}