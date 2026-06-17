import { saveConstraints } from "../services/onboardingConstraints.service.js";

export async function onboardingConstraintsController(req: any, res: any) {
  const result = await saveConstraints(req.user.uid, req.body);

  return res.status(200).json(result);
}
