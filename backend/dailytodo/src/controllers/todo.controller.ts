import { Request, Response } from "express";
import timetableService from "../services/time-table.service.js";

export const createOrUpdateTimetable = async (
    req: Request,
    res: Response
) => {
    try {

        const uid = req.user?.uid;

        if (!uid) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const timetable = await timetableService.createOrUpdate(
            uid,
            req.body
        );

        return res.status(200).json({
            success: true,
            data: timetable
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

export const deleteTimetable = async (
    req: Request,
    res: Response
) => {

    try {

        const uid = req.user?.uid;

        if (!uid) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await timetableService.delete(
            uid,
            String(req.params.id)
        );

        return res.status(200).json({
            success: true,
            message: "Timetable deleted."
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};