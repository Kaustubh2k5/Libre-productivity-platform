import { onboardUser }
from "../services/onboarding.service.js";

export async function onboardController(
    req: any,
    res: any
) {
    const result =
        await onboardUser(
            req.user.uid,
            req.body
        );

    return res.status(200).json(
        result
    );
}