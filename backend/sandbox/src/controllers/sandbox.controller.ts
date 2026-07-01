import { Request, Response } from "express";
import * as sandboxService from "../services/sandbox.service.js";

export async function getTables(req: Request, res: Response) {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const tables = await sandboxService.getAllTables(uid);

    return res.status(200).json({
      success: true,
      data: tables,
    });
  } catch (error) {
    console.error("Error fetching sandbox tables:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function createTable(req: Request, res: Response) {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const table = await sandboxService.createTable(uid, req.body);

    return res.status(201).json({
      success: true,
      data: table,
    });
  } catch (error) {
    console.error("Error creating sandbox table:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function updateTable(req: Request, res: Response) {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const { id } = req.params;

    const table = await sandboxService.updateTable(id as string, uid, req.body);

    if (!table) {
      return res.status(404).json({
        success: false,
        error: "Table not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: table,
    });
  } catch (error) {
    console.error("Error updating sandbox table:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function deleteTable(req: Request, res: Response) {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const { id } = req.params;

    const table = await sandboxService.deleteTable(id as string, uid);

    if (!table) {
      return res.status(404).json({
        success: false,
        error: "Table not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Table deleted",
    });
  } catch (error) {
    console.error("Error deleting sandbox table:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}
