import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ManageExpenses() {
  return (
    <View style={styles.container}>
      <Text>This is expense screen</Text>
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D32F2F",
    alignItems: "center",
    justifyContent: "center",
  },
});
