import React from "react";
import { Platform, StyleSheet, Text } from "react-native";

export const Header = () => (
  <Text style={styles.encabezado}>Criptomonedas</Text>
);

const styles = StyleSheet.create({
  encabezado: {
    padding: Platform.OS === "ios" ? 50 : 10,
    fontFamily: "Lato-Black",
    backgroundColor: "#5E49E2",
    paddingBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 30,
  },
});
