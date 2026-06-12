import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";

interface AccessTokenPayload {
    sub: string;
    email?: string;
    role?: string;
}

export function verifyAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                error: "AUTH_HEADER_MISSING"
            });
        }

        const [scheme, token] =
            authHeader.split(" ");

        if (
            scheme !== "Bearer" ||
            !token
        ) {
            return res.status(401).json({
                success: false,
                error: "INVALID_AUTH_HEADER"
            });
        }

        const payload =
            jwt.verify(
                token,
                process.env.JWT_ACCESS_SECRET!
            ) as AccessTokenPayload;

        req.user = {
            uid: payload.sub,
            email: payload.email,
            role: payload.role
        };

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            error: "INVALID_ACCESS_TOKEN"
        });

    }
}