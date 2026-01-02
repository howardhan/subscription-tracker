import nodemailer from 'nodemailer'
import { EMAIL_PASSWORD } from './env.js'

export const accountEmail = 'ythoward2016@gmail.com'

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   user: accountEmail,
//   pass: EMAIL_PASSWORD,
// })
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: accountEmail,
    pass: EMAIL_PASSWORD,
  },
})
export default transporter
