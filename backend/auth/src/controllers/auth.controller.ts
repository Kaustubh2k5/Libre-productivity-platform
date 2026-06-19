import { Request, Response, NextFunction } from "express";
import {signupStartService,signupVerifyService} from "../modules/signup/services/signup.service.js";
import { signinService } from "../modules/signin/services/signin.service.js";
import { signoutService } from "../modules/signout/services/signout.service.js";
import { refreshService } from "../modules/refresh/refresh.service.js";
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

/**
 * Sign in user and create session
 */
export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, clientId } = req.body;

    const result = await signinService({
      email,
      password,
      clientId,
    });

    return res.status(200).json({
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

/**
 * Sign out user and revoke session
 */
export const signout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = req.body;

    const result = await signoutService({
      refreshToken,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async(
  req: Request,
  res: Response,
  next: NextFunction,
) =>{
  try {
    const { refreshToken } = req.body;

    const tokens = await refreshService(refreshToken);

    return res.status(200).json(tokens);
  } catch (err) {
    next(err);
  }
}