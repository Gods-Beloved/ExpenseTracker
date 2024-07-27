import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { EXPENSE_COLORS } from "../../utils/styles";

const DUMMY_EXPENSE = [
  {
    id: "e1",
    description: "Rent",
    amount: 56.0,
    date: new Date("2022-07-05"),
  },

  {
    id: "e6",
    description: "Rent Room 2",
    amount: 450.7,
    date: new Date("2022-07-15"),
  },

  {
    id: "e7",
    description: "Rent Room 3",
    amount: 34.4,
    date: new Date("2022-04-15"),
  },

  {
    id: "e2",
    description: "Rent Room 4",
    amount: 45.78,
    date: new Date("2022-07-18"),
  },

  {
    id: "e3",
    description: "Rent Room 5",
    amount: 223.67,
    date: new Date("2022-07-19"),
  },

  {
    id: "e4",
    description: "Rent Room 6",
    amount: 5000,
    date: new Date("2022-07-15"),
  },
];

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.rootContainer}>
      <ExpensesSummary expenses={DUMMY_EXPENSE} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSE} />
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
});
