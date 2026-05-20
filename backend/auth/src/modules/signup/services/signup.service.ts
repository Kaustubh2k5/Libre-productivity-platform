import { UserRepository } from "../../../repositories/user.repository.js";
import { AppRepository } from "../../../repositories/app.repository.js";
import { MembershipRepository } from "../../../repositories/membership.repository.js";
import { RefreshSessionRepository } from "../../../repositories/refresh-session.repository.js";
import { SessionCacheRepository } from "../../../repositories/session-cache.repository.js";
import { OtpRepository } from "../../../repositories/otp.repository.js";
import {hashPassword,hashToken,generateOtp} from "../../../lib/bcrypt.js";
import {generateAccessToken,generateRefreshToken,} from "../../../lib/tokens.js";
import { sendOtpEmail } from "../../../lib/mailer.service.js";
import { prisma } from "../../../lib/db.js";
import {Prisma} from "@prisma/client";
const userRepository =
  new UserRepository();

const appRepository =
  new AppRepository();

const membershipRepository =
  new MembershipRepository();

const refreshSessionRepository =
  new RefreshSessionRepository();

interface SignupInput {
  email: string;
  password: string;
  clientId: string;
}

export const signupStartService =
  async ({
    email,
    password,
    clientId,
  }: SignupInput) => {
    /**
     * validate app
     */
    const app =
      await appRepository.findByClientId(
        clientId
      );

    if (!app) {
      throw new Error(
        "Invalid client"
      );
    }

    /**
     * check existing user
     */
    const existingUser =
      await userRepository.findByEmail(
        email
      );

    if (existingUser) {
      throw new Error(
        "User already exists"
      );
    }

    /**
     * generate OTP
     */
    const otp =
      generateOtp();

    /**
     * deterministic SHA256 hash
     */
    const otpHash =
      hashToken(otp);

    /**
     * bcrypt password hash
     */
    const passwordHash =
      await hashPassword(
        password
      );

    /**
     * store OTP state
     */
    await OtpRepository.storeOtp(
      email,
      {
        otpHash,
        email,
        passwordHash,
        clientId,
      },
      Number(
        process.env.OTP_TTL
      )
    );

    console.log("OTP:", otp);

    await sendOtpEmail(
      email,
      otp
    ).catch(console.error);

    return {
      message:
        "OTP sent successfully",
    };
  };

interface SignupVerifyInput {
  email: string;
  otp: string;
  clientId: string;
}
export const signupVerifyService =
  async ({
    email,
    otp,
    clientId,
  }: SignupVerifyInput) => {
    /**
     * get OTP state
     */
    const otpData =
      await OtpRepository.getOtp(
        email
      );

    if (!otpData) {
      throw new Error(
        "OTP expired or invalid"
      );
    }

    /**
     * validate app
     */
    const app =
      await appRepository.findByClientId(
        clientId
      );

    if (!app) {
      throw new Error(
        "Invalid client"
      );
    }

    /**
     * validate OTP ownership
     */
    if (
      otpData.clientId !== clientId
    ) {
      throw new Error(
        "Invalid client"
      );
    }

    /**
     * deterministic OTP compare
     */
    const otpMatches =
      hashToken(otp) ===
      otpData.otpHash;

    if (!otpMatches) {
      await OtpRepository.incrementOtpAttempts(
        email
      );

      throw new Error(
        "Invalid OTP"
      );
    }

    /**
     * double-check user existence
     */
    const existingUser =
      await userRepository.findByEmail(
        email
      );

    if (existingUser) {
      throw new Error(
        "User already exists"
      );
    }

    /**
     * generate opaque refresh token
     */
    const refreshToken =
      generateRefreshToken();

    /**
     * deterministic SHA256 refresh hash
     */
    const refreshTokenHash =
      hashToken(
        refreshToken
      );

    /**
     * refresh token ttl
     */
    const refreshTokenTtl =
      Number(
        process.env
          .REFRESH_TOKEN_TTL
      );

    /**
     * expiry timestamp
     */
    const expiresAt =
      new Date(
        Date.now() +
          refreshTokenTtl *
            1000
      );

    /**
     * atomic DB operations
     */
    const result =
      await prisma.$transaction(
        async (tx: Prisma.TransactionClient) => {
          /**
           * create user
           */
          const user =
            await userRepository.createUser(
              {
                email,
                passwordHash:
                  otpData.passwordHash,
              },
              tx
            );

          /**
           * create membership
           */
          await membershipRepository.createMembership(
            {
              userId:
                user.id,
              appId:
                app.id,
            },
            tx
          );

          /**
           * create refresh session
           */
          const session =
            await refreshSessionRepository.createSession(
              {
                userId:
                  user.id,
                tokenHash:
                  refreshTokenHash,
                expiresAt,
              },
              tx
            );

          return {
            user,
            session,
          };
        }
      );

    const { user, session } =
      result;

    /**
     * generate access token
     */
    const accessToken =
      generateAccessToken({
        userId:
          user.id,
        email:
          user.email,
        clientId,
      });

    /**
     * cache session
     */
    await SessionCacheRepository.cacheSession(
      refreshTokenHash,
      {
        sessionId:
          session.id,
        userId:
          user.id,
        revoked:
          false,
        expiresAt:
          expiresAt.toISOString(),
      },
      refreshTokenTtl
    );

    /**
     * cleanup OTP state
     */
    await OtpRepository.deleteOtp(
      email
    );

    await OtpRepository.clearOtpAttempts(
      email
    );

    return {
      message:
        "Signup successful",
      accessToken,
      refreshToken,
    };
  };