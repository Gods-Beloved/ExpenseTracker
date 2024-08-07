import React, { useContext, useLayoutEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import IconButton from "../components/expensesOutput/IconButton";
import { EXPENSE_COLORS } from "../utils/styles";
import Button from "../components/expensesOutput/Button";
import { ExpenseContext } from "../stores/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpenses({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const expenseCtx = useContext(ExpenseContext);

  //!! is used to confirm truthy of falsy value
  const isEditing = !!editedExpenseId;

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editedExpenseId);

    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  //Navigation with set options should be in useLayoutEffect

  return (
    <View style={styles.container}>
      <ExpenseForm isEditing={isEditing} />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            color={EXPENSE_COLORS.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  deleteContainer: {
    marginTop: 16,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: EXPENSE_COLORS.colors.primary200,
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: EXPENSE_COLORS.colors.primary800,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
