import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};