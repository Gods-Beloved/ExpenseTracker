import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import { EXPENSE_COLORS } from "../../utils/styles";
import Button from "../expensesOutput/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ExpenseContext } from "../../stores/expense-context";
import { getFormattedDate } from "../../utils/date";

function ExpenseForm({ isEditing }) {
  const expenseCtx = useContext(ExpenseContext);

  const navigation = useNavigation();

  const route = useRoute();

  editedExpenseId = route.params?.expenseId;

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  const initAmount = selectedExpense
    ? selectedExpense.amount.toFixed(2).toString()
    : 0;
  const initDesc = selectedExpense ? selectedExpense.description : "";
  const initDate = selectedExpense
    ? getFormattedDate(selectedExpense.date)
    : // new Date(selectedExpense.date).toString()
      "";

  const [amount, setAmount] = useState(initAmount);
  const [date, setDate] = useState(initDate);
  const [description, setDescription] = useState(initDesc);

  function amountChangedHandler(amt) {
    setAmount(+amt);
    // update state with the new amount value
  }

  function dateChangedHandler(date) {
    setDate(date);
    // update state with the new date value
  }

  function descriptionChangedHandler(dsc) {
    console.log(dsc);
    setDescription(dsc);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    const amountIsValid = !isNaN(amount) && amount > 0;
    const dateIsValid = new Date(date).toString() !== "Invalid Date";
    const descriptionIsValid = description.trim() !== "";

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert("Invalid Input", "Please check your input values");
      return;
    }

    {
      isEditing
        ? expenseCtx.updateExpense(editedExpenseId, {
            description: description,
            amount: +amount,
            date: new Date(date),
          })
        : expenseCtx.addExpense({
            description: description,
            amount: amount,
            date: new Date(date),
          });
    }

    // expenseCtx.updateExpense(editedExpenseId, {
    //   description: "Test Updated",
    //   amount: 123.45,
    //   date: new Date("2022-05-20"),
    // });

    navigation.goBack();
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            placeholder: "Enter amount",
            keyboardType: "decimal-pad",
            onChangeText: amountChangedHandler,
            maxLength: 10,
            value: amount,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: dateChangedHandler,
            value: date,
          }}
          style={styles.rowInput}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          placeholder: "Enter description",
          multiline: true,
          onChangeText: descriptionChangedHandler,
          value: description,
        }}
      />

      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
    marginVertical: 24,
    textAlign: "center",
  },
  form: {
    marginTop: 40,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
