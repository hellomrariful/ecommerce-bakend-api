import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

const {PORT, MONGO_URI} = config;

const bootstrap = async()=>{
  await mongoose.connect(MONGO_URI as string);
  
  app.listen(PORT || 3000, () => {
    console.log(`server is running at http://localhost:${PORT}`);
  });
}
bootstrap();