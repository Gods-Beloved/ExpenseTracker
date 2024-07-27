import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { EXPENSE_COLORS } from "../../utils/styles";

function ExpenseItem({ date, amount, desc }) {
  console.log(date);
  return (
    <Pressable>
      <View style={styles.item}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{desc}</Text>
          <Text style={styles.textBase}>{date}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: EXPENSE_COLORS.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: EXPENSE_COLORS.colors.gray500,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
  },

  textBase: {
    color: EXPENSE_COLORS.colors.primary50,
  },

  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },

  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },

  amount: {
    color: EXPENSE_COLORS.colors.primary500,
    fontWeight: "bold",
  },
});
