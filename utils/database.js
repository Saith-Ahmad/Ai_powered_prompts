import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectionToDB = async () => {
    // mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'share_Prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed");
        console.error(error);
    }
};
