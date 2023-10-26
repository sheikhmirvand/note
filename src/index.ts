import express, { Application } from "express";
import cors from "cors";

// import routes
import authRoute from "./components/auth/router/authRoute";
import folderRoute from "./components/folder/routes/folderRoute";

export class App {
    app: Application;
    constructor() {
        this.app = express();
    }

    startApp(port: number) {
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use("/api/v1/auth", authRoute);
        this.app.use("/api/v1/folder", folderRoute);

        this.app.get("/", (req, res) => {
            res.send("salam");
        });

        this.app.listen(port, () => console.log(`app listen on ${port} port`));
    }
}
