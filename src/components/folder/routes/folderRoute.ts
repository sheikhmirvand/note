import { Router } from "express";
import { FolderRepo } from "../repository/folderRepository";

const router = Router();

router.get("/", (req, res) => {
    const repo = new FolderRepo();
    res.json(repo);
});

export default router;
