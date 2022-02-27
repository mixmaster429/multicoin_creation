import * as pug from 'pug';
require("dotenv").config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async ({ pathEmail, dataEmail, email, title, from = `${process.env.EMAIL_SENDER}` }) => {

  const compiledFunction = pug.compileFile(pathEmail);

  let html = compiledFunction(dataEmail);

  const msg = {
    to: email,
    from,
    subject: title,
    html: html,
  }
  try {
    const res = await sgMail.send(msg)
    console.log("email delivery", res)
  } catch (error) {
    console.log("send mail error", error)
  }
}
