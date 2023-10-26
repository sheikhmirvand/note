import { Router } from "express";
import { FolderRepo } from "../repository/folderRepository";
import folderController from "../controller/folderController";

const router = Router();

// create new folder => /api/v1/folder -> POST
router.post("/", folderController.createNewFolder);

// get all folders => /api/v1/folder -> GET
router.get("/", folderController.getAllFolder);

export default router;
