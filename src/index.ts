import express, { Application } from "express";
import cors from "cors";

export class App {
    app: Application;

    constructor() {
        this.app = express();
    }

    startApp(port: number) {
        this.app.use(cors());
        this.app.use(express.json());

        this.app.get("/", (req, res) => {
            res.send("salam");
        });

        this.app.listen(port, () => console.log(`app listen on ${port} port`));
    }
}
