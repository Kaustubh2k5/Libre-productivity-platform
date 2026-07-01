import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AccessTokenPayload {
  userId: string;
  email: string;
  clientId: string;
  iat?: number;
  exp?: number;
}

export function verifyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "AUTH_HEADER_MISSING",
      });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        error: "INVALID_AUTH_HEADER",
      });
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!,
    ) as AccessTokenPayload;

    req.user = {
      uid: payload.userId,
      email: payload.email,
    };

    next();
  } catch (error) {
    console.error("JWT VERIFY ERROR:", error);

    return res.status(401).json({
      success: false,
      error: "INVALID_ACCESS_TOKEN",
    });
  }
}
