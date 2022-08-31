// Pagina de configurações
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Ainda não sei o que fazer aqui...{'\n'}:/</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3B81",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  text: {
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
  },
});

