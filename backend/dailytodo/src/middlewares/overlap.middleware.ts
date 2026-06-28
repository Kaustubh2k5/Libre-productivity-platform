import { Request, Response, NextFunction } from "express";

export function validateNoOverlap(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slots = [...req.body.slots];

  slots.sort(
    (a, b) =>
      new Date(a.startTime).getTime() -
      new Date(b.startTime).getTime()
  );

  for (let i = 1; i < slots.length; i++) {
    const prevEnd = new Date(
      slots[i - 1].endTime
    );

    const currentStart = new Date(
      slots[i].startTime
    );

    if (currentStart < prevEnd) {
      return res.status(400).json({
        success: false,
        message: "Overlapping slots detected.",
      });
    }
  }

  next();
}