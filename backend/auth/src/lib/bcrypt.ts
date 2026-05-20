import bcrypt from "bcrypt";
import crypto from "crypto";

const SALT_ROUNDS = 12;
/**
 * PASSWORD HASHING
 * Slow hashing for human passwords
 */
export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const compareHash = async (value: string, hash: string) => {
  const valueHash = hashToken(value);
  return valueHash === hash;
};
/**
 * FAST TOKEN HASHING
 * For OTPs + refresh tokens
 */
export const hashToken = (value: string) => {
  return crypto.createHash("sha256").update(value).digest("hex");
};

/**
 * OTP GENERATION
 */
export const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};
