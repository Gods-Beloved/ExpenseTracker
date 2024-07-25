import React from "react";
import { View, Text, FlatList } from "react-native";

function RenderExpenseItem(item) {
  console.log(item);
  return <Text>{item.amount}</Text>;
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
