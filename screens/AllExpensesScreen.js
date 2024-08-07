import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { ExpenseContext } from "../stores/expense-context";

function AllExpensesScreen() {
  const expensesCtx = useContext(ExpenseContext);

  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expensesCtx.expenses}
      falbackText="No Registered Expenses Found"
    />
  );
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
