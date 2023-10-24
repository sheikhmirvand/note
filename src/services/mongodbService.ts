import mongoose from "mongoose";
import colors from "colors";

const conndb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as unknown as string);
        console.log(colors.cyan("db connected"));
    } catch (error) {
        if (error instanceof Error) console.log(colors.bgRed(error.message));
    }
};

export default conndb;
