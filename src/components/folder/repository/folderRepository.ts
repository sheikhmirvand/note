import Folder from "../models/folderModel";
import { FOlderInterFace } from "./IFolderInterFace";

export class FolderRepo {
    findAllFolders = async () => {
        return await Folder.find();
    };

    findSingleFolderById = async (id: string) => {
        return Folder.findById(id);
    };

    createFolder = async ({ title }: FOlderInterFace) => {
        return await Folder.create({ title });
    };
}
