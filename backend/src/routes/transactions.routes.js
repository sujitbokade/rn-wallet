import express from "express";
import {
  createTransactions,
  deleteTransaction,
  getTransaction,
  getTransactionSummary,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/addTransaction", createTransactions);
router.get("/getTransactions/:id", getTransaction);
router.delete("/deleteTransaction/:id", deleteTransaction);
router.get("/getSummary/:id", getTransactionSummary);

export default router;
