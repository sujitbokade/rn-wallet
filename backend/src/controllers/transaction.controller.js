import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

export const createTransactions = async (req, res) => {
  try {
    const { user_id, title, amount, category } = req.body;

    const user = await User.findById(user_id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    const newTransaction = await Transaction.create({
      user_id: user._id,
      title,
      amount,
      category,
    });
    res.status(201).json({ success: true, data: newTransaction });
  } catch (error) {
    console.error("Failed to add transaction", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    const transactions = await Transaction.find({ user_id: user._id }).populate(
      "user_id",
      "-password"
    );
    return res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error("Failed to get transaction", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction)
      return res
        .status(400)
        .json({ success: false, message: "Transaction not found" });
    await Transaction.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Failed to get transaction", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getTransactionSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const transactions = await Transaction.find({ user_id: id });

    // Initialize totals
    let balance = 0;
    let income = 0;
    let expense = 0;

    // Calculate summary
    transactions.forEach((tx) => {
      const amount = Number(tx.amount);
      balance += amount;
      if (tx.amount > 0) {
        income += amount;
      } else {
        expense += amount; // expense will be negative
      }
    });

    return res.status(200).json({
      success: true,
      summary: {
        balance,
        income,
        expense,
      },
    });
  } catch (error) {
    console.error("Failed to get transaction summary", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
