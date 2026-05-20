import { Request, Response, NextFunction } from "express";
import {
  signupStartService,
  signupVerifyService,
} from "../modules/signup/services/signup.service.js";

/**
 * STEP 1
 * Initiate signup
 */

export const signupstart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, clientId } = req.body;

    const result = await signupStartService({
      email,
      password,
      clientId,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * STEP 2
 * Verify OTP and create account
 */
export const verifySignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, otp, clientId } = req.body;

    const result = await signupVerifyService({
      email,
      otp,
      clientId,
    });

    return res.status(201).json({
      success: true,
      message: result.message,

      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
