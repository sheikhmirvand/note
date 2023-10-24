import mongoose from "mongoose";
import { App } from ".";
import { config } from "dotenv";
import conndb from "./services/mongodbService";
config();

const app = new App();
conndb();
const port = (process.env.PORT as unknown as number) || 5050;

mongoose.connection.once("open", () => {
    app.startApp(port);
});
