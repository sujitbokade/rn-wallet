import express from "express";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/user.routes.js";
import transactionRoute from "./routes/transactions.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", authRoute);
app.use("/api/transaction", transactionRoute);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => console.log("Server is running on port 3000"));
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
