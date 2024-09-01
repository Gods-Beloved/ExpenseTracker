import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { EXPENSE_COLORS } from "../../utils/styles";

function Input({ label, textInputConfig, style, invalid }) {
  let inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.errorInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid ? styles.errorLabel : ""]}>
        {label}
      </Text>
      <TextInput
        style={inputStyles}
        {...textInputConfig}
        selectionColor={EXPENSE_COLORS.colors.primary700}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: EXPENSE_COLORS.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: EXPENSE_COLORS.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 14,
    color: EXPENSE_COLORS.colors.primary700,
    borderWidth: 1,
    borderColor: EXPENSE_COLORS.colors.primary200,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  errorLabel: {
    color: EXPENSE_COLORS.colors.error500,
  },
  errorInput: {
    backgroundColor: EXPENSE_COLORS.colors.error50,
  },
});
