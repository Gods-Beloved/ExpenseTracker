import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { EXPENSE_COLORS } from "../../utils/styles";

function ExpensesOutput({ expenses, expensesPeriod, falbackText }) {
  let content = <Text style={styles.infoText}>{falbackText}</Text>;

  if (expenses.length > 0) {
    content = (
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
    );
  }

  return (
    <View style={styles.rootContainer}>
      {content}

      <ExpensesList expenses={expenses} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 24,
    flex: 1,
    backgroundColor: EXPENSE_COLORS.colors.primary700,
  },
  infoText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 34,
  },
});
