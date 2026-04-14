// lib/jwt.ts
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);
const EXP_SECONDS = Number(process.env.JWT_EXP_SECONDS || 3600);

export async function signJwt(payload: Record<string, unknown>, sessionId: string) {
  const exp = Math.floor(Date.now() / 1000) + EXP_SECONDS;
  return await new SignJWT({ ...payload, sid: sessionId })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .sign(SECRET);
}

export async function verifyJwt(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, SECRET);
  return payload;
}

export function jwtExpiryTimestamp(): number {
  return Math.floor(Date.now() / 1000) + EXP_SECONDS;
}
