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

  // const initAmount = selectedExpense
  //   ? selectedExpense.amount.toFixed(2).toString()
  //   : 0;
  // const initDesc = selectedExpense ? selectedExpense.description : "";
  // const initDate = selectedExpense
  //   ? getFormattedDate(selectedExpense.date)
  //   : // new Date(selectedExpense.date).toString()
  //     "";

  const [inputValues, setInputValues] = useState({
    amount: {
      value: selectedExpense ? selectedExpense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: selectedExpense
        ? getFormattedDate(selectedExpense.date)
        : // new Date(selectedExpense.date).toString()
          "",
      isValid: true,
    },
    description: {
      value: selectedExpense ? selectedExpense.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((currentIntVals) => {
      return {
        ...currentIntVals,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    const expenseData = {
      description: inputValues.description.value,
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim() !== "";

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((curValue) => {
        return {
          amount: { value: curValue.amount.value, isValid: amountIsValid },
          date: { value: curValue.date.value, isValid: dateIsValid },
          description: {
            value: curValue.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      // Alert.alert("Invalid Input", "Please check your input values");
      return;
    }

    {
      isEditing
        ? expenseCtx.updateExpense(editedExpenseId, expenseData)
        : expenseCtx.addExpense(expenseData);
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
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            placeholder: "Enter amount",
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            maxLength: 10,
            value: inputValues.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date.value,
          }}
          style={styles.rowInput}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          placeholder: "Enter description",
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description.value,
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
