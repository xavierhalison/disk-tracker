import mongoose from "mongoose";

const connectToDatabase = async () => {
  const { MONGO_URI } = process.env;

  try {
    console.log("Connecting to database...");
    await mongoose.connect(MONGO_URI!);
    console.log("Successfully connected to database.");
  } catch (error) {
    console.log("Could not connect to database.");
    process.exit(1);
  }
};

export default connectToDatabase;
