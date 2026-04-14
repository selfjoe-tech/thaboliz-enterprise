"use server";

import nodemailer from 'nodemailer';

const mailCode = async (verifyObject) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'thefruitbasketpty@gmail.com',
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'The Fruit Basket <thefruitbasketpty@gmail.com>',
    to: verifyObject.email,
    subject: 'Verification Code - The Fruit Basket',
    text: `Your verification code: ${verifyObject.generatedCode}. Don't share this with anyone.`,
    html: ""
  };

  try {
    await transporter.sendMail(mailOptions);    
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default mailCode;