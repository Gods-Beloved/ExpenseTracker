import React, { useContext, useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import IconButton from "../components/expensesOutput/IconButton";
import { EXPENSE_COLORS } from "../utils/styles";
import Button from "../components/expensesOutput/Button";
import { ExpenseContext } from "../stores/expense-context";

function ManageExpenses({ route, navigation }) {
  const expenseCtx = useContext(ExpenseContext);

  const editedExpenseId = route.params?.expenseId;

  //!! is used to confirm truthy of falsy value
  const isEditing = !!editedExpenseId;

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editedExpenseId);

    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    {
      isEditing
        ? expenseCtx.updateExpense(editedExpenseId, {
            description: "Test Updated",
            amount: 123.45,
            date: new Date("2022-05-20"),
          })
        : expenseCtx.addExpense({
            description: "Test",
            amount: 123.45,
            date: new Date(),
          });
    }

    // expenseCtx.updateExpense(editedExpenseId, {
    //   description: "Test Updated",
    //   amount: 123.45,
    //   date: new Date("2022-05-20"),
    // });

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
      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
