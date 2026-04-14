"use server";
import { parse } from 'cookie';
import {createUser} from "./createUser";

export async function verifyCode(code) {
  try {
    // Parse the JSON body from the incoming request
    const { userInputCode } =  code;

    // Read and parse the cookies from the request header
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = parse(cookieHeader);
    const storedCode = cookies.verificationCode;
    const storedPassword = cookies.userPassword;
    const storedUserName = cookies.userName;
    const storedEmail = cookies.userEmail;
    
    const userInfo = {
      email: storedEmail,
      username: storedUserName,
      password: storedPassword,
    };

    if (!storedCode) {
      return new Response(
        { error: 'Verification code expired or not found. Return to Sign Up page' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (userInputCode === storedCode) {
      // Create the user in Sanity
      await createUser(userInfo);
      return new Response(
        { message: 'Verified' },
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        { error: 'Incorrect code' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      { error: 'Internal server error' },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}