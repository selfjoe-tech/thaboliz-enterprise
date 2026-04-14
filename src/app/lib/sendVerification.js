"use server";
import { serialize } from 'cookie';
import mailCode from './verification_mailer'

export const sendVerificationEmail = async ({ email, password, username }) => {
  try {

    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

    mailCode({ email, generatedCode });

    const cookies = [
      serialize('verificationCode', generatedCode, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
        maxAge: 180,
      }),
      serialize('userPassword', password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
        maxAge: 180,
      }),
      serialize('userName', username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
        maxAge: 180,
      }),
      serialize('userEmail', email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
        maxAge: 180,
      }),
    ];

    return new Response(
      { message: 'Verification email sent.' },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': cookies,
        },
      }
    );
  } catch (err) {
    return new Response(
      { error: `${err}: Failed to process request.` },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};