import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function getMongoUri(): string {
  if (process.env.DB_TARGET === "atlas") {
    if (!process.env.MONGO_ATLAS_URI) {
      throw new Error("MONGO_ATLAS_URI is missing in .env");
    }
    return process.env.MONGO_ATLAS_URI;
  }
  if (!process.env.MONGO_LOCAL_URI) {
    throw new Error("MONGO_LOCAL_URI is missing in .env");
  }
  return process.env.MONGO_LOCAL_URI;
}

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = getMongoUri();
    await mongoose.connect(mongoUri);
    console.log(`Connected to ${process.env.DB_TARGET} database`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Database connection failed: ", error.message);
    } else {
      console.error("Database connection failed: ", error);
    }
    process.exit(1);
  }
};

export const closeConnection = async (): Promise<void> => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed.");
};
