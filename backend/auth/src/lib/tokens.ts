import jwt from "jsonwebtoken";
import crypto from "crypto";

interface AccessTokenPayload {
  userId: string;
  email: string;
  clientId: string;
}

/**
 * Generate JWT access token
 */
export const generateAccessToken = (
  payload: AccessTokenPayload
) => {
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET!,
    {
      expiresIn: "15m",
    }
  );
};

/**
 * Generate opaque refresh token
 */

export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};