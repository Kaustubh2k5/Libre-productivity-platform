import { saveProfile } from "../services/onboardingProfile.service.js";

export async function onboardingProfileController(req: any, res: any) {
  const result = await saveProfile(req.user.uid, req.body);

  return res.status(200).json(result);
}
