import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sujit:sujit1234@cluster0.x974sp5.mongodb.net/"
    );
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
};
