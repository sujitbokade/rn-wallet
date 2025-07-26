// react custom hook file

import { useCallback, useState } from "react";
import { Alert } from "react-native";

const API_URL = "http://localhost:3000/api";

export const useTransactions = (id) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // useCallback is used for performance reasons, it will memoize the function
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/transaction/getTransactions/${id}`
      );
      const data = await response.json();
      setTransactions(data?.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [id]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transaction/getSummary/${id}`);
      const data = await response.json();
      setSummary(data?.summary);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [id]);

  const loadData = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      // can be run in parallel
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, id]);

  const deleteTransaction = async (id) => {
    console.log("🚀 ~ deleteTransaction ~ id:", id);
    try {
      const response = await fetch(
        `${API_URL}/transaction/deleteTransaction/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete transaction");

      // Refresh data after deletion
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", error.message);
    }
  };

  return { transactions, summary, isLoading, loadData, deleteTransaction };
};
