import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { EXPENSE_COLORS } from "../../utils/styles";

function Button({ onPress, children, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
      {/* Add your custom styles here */}
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 9,
    backgroundColor: EXPENSE_COLORS.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: EXPENSE_COLORS.colors.primary50,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: EXPENSE_COLORS.colors.primary100,
    borderRadius: 4,
  },

  // Add your custom styles here
});
