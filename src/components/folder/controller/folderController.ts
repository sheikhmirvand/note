import { Request, Response } from "express";
import { FolderRepo } from "../repository/folderRepository";
import { validationResult } from "express-validator";

export class FolderController {
    private readonly folderRepo: FolderRepo;
    constructor() {
        this.folderRepo = new FolderRepo();
    }

    createNewFolder = async (req: Request, res: Response) => {
        try {
            const { title } = req.body;

            const result = validationResult(req);
            if (!result.isEmpty()) return res.status(400).json(result.array());

            const exFolder = await this.folderRepo.findSingleFolderByTitle(
                title
            );
            if (exFolder)
                return res.status(400).json({ message: "name not unique" });

            const folder = await this.folderRepo.createFolder({ title });

            res.status(200).json({ folder });
        } catch (error) {
            if (error instanceof Error)
                return res.status(500).json({ message: error.message });
        }
    };

    getAllFolder = async (req: Request, res: Response) => {
        try {
            const folders = await this.folderRepo.findAllFolders();
            if (!folders)
                return res.json({
                    message: "we dont have folder please create it",
                });
            res.status(200).json(folders);
        } catch (error) {
            if (error instanceof Error)
                return res.status(500).json({ message: error.message });
        }
    };

    getSingleFolder = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const folder = await this.folderRepo.findSingleFolderById(id);
        } catch (error) {
            if (error instanceof Error)
                return res.status(500).json({ message: error.message });
        }
    };
}

const folderController = new FolderController();

export default folderController;
