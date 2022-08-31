// Pagina de perfil
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Profile</Text>
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