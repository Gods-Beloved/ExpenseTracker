import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";

function RecentExpenseScreen() {
  return <ExpensesOutput expensesPeriod="Last 7 days" />;
}

export default RecentExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D32F2F",
    alignItems: "center",
    justifyContent: "center",
  },
});
