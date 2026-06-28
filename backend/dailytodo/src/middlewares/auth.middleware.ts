import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AccessTokenPayload {
  userId: string;
  email?: string;
  clientId?: string;
}

export function verifyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;
    console.log("JWT_PUBLIC_KEY =", process.env.JWT_PUBLIC_KEY);
    console.log("JWT_ACCESS_SECRET =", process.env.JWT_ACCESS_SECRET);
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
      process.env.JWT_PUBLIC_KEY!,
    ) as AccessTokenPayload;

    req.user = {
      uid: payload.userId,
      email: payload.email,
      clientId: payload.clientId,
    };

    next();
  } catch (error) {
    console.error("JWT ERROR:", error);

    return res.status(401).json({
      success: false,
      error: "INVALID_ACCESS_TOKEN",
    });
  }
}