import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { EXPENSE_COLORS } from "../../utils/styles";

function ExpensesSummary({ expenses, periodName }) {
  const expenseSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expenseSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: EXPENSE_COLORS.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  period: {
    fontSize: 12,
    color: EXPENSE_COLORS.colors.primary400,
  },

  sum: {
    fontSize: 18,
    fontWeight: "bold",
    color: EXPENSE_COLORS.colors.primary500,
  },
});
