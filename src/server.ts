import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

const { PORT, MONGO_URL } = config;

const bootstrap = async () => {
  try {
    await mongoose.connect(MONGO_URL as string);
    app.listen(PORT || 3000, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};
bootstrap();
