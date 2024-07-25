import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";

function AllExpensesScreen() {
  return <ExpensesOutput expensesPeriod="Total" />;
}

export default AllExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D32F2F",
    alignItems: "center",
    justifyContent: "center",
  },
});
