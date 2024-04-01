import nodemailer, { TransportOptions } from "nodemailer";

interface smtpTransportOptionsType extends TransportOptions {
  host: string | undefined;
  port: string | undefined;
  auth: {
    user: string | undefined;
    pass: string | undefined;
  };
}

interface sendMailOptionType {
  email: string;
  subject: string;
  message: string;
}

export const sendNodeMail = (option: sendMailOptionType) => {
  const smtpTransportOptions: smtpTransportOptionsType = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  };

  const nodemailerTransporter =
    nodemailer.createTransport(smtpTransportOptions);

  const mailOption = {
    to: option.email,
    from: "Faiz johnas <faizJohnas@gmail.io>",
    subject: option.subject,
    text: option.message,
  };

  nodemailerTransporter.sendMail(mailOption);
};

export default sendNodeMail;
