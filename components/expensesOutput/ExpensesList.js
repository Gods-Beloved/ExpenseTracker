import React from "react";
import { View, Text, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { getFormattedDate } from "../../utils/date";

function RenderExpenseItem(item) {
  return (
    <ExpenseItem
      amount={item.amount}
      date={getFormattedDate(item.date)}
      desc={item.description}
      id={item.id}
    />
  );
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => {
        return RenderExpenseItem(item);
      }}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
