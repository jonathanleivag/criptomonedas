import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const App = () => {
  return (
    <View style={styles.container}>
      <Text>Hola mundo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
