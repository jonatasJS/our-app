import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfettiCannon from "react-native-confetti-cannon";

export default function HomeScreen() {
  const [copos, setCopos] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const color = [
    "#e67e22",
    "#2ecc71",
    "#3498db",
    "#84AAC2",
    "#E6D68D",
    "#F67933",
    "#42A858",
    "#4F50A2",
    "#A86BB7",
    "#e74c3c",
    "#1abc9c",
  ];

  useEffect(() => {
    setTimeout(async () => {
      if (
        (await AsyncStorage.getItem("day")) !=
        String(
          new Date().getDate() || (await AsyncStorage.getItem("day")) == null
        )
      ) {
        await AsyncStorage.setItem("day", String(new Date().getDate()));
        await AsyncStorage.setItem("copos", "0");
        setCopos(0);
      }
      setCopos(Number(await AsyncStorage.getItem("copos")) || 0);
    }, 1);
    // (async () => {
    //   const { status } = await Camera.requestCameraPermissionsAsync();
    //   setHasPermission(status === "granted");
    // })();
  }, []);

  async function addCopo() {
    try {
      setCopos(copos + 1);
      await AsyncStorage.setItem("copos", `${copos + 1}`, () => {
        if (copos == 4) {
          Alert.alert("🎊 Parabéns! 🎉", "Você acaba de beber 5 copos!");
          return setShowConfetti(true);
        }

        if (copos == 9) {
          Alert.alert("🎊 Parabéns! 🎉", "Você acaba de beber 10 copos!");
          return setShowConfetti(true);
        }

        if (copos == 14) {
          return Alert.alert("😲 MANO", "Para, 15 copos é exagerado!");
        }

        setShowConfetti(false);
        // Alert.alert("Parabéns! 🎊", "Mais um copo de água bebido!");
      });
    } catch {
      Alert.alert("Erro", "Erro ao adicionar copo");
    }
  }

  async function remoCopos() {
    try {
      if (copos <= 0)
        return Alert.alert(
          "🤨",
          "Você não bebeu água hoje!\nAnda, vá beber água 😉"
        );
      setCopos(copos - 1);
      await AsyncStorage.setItem("copos", `${copos - 1}`, () =>
        Alert.alert("🤨", "Você removeu um copo de água!")
      );
    } catch {
      Alert.alert("Erro", "Erro ao remover copos");
    }
  }

  return (
    <View style={styles.container}>
          {showConfetti && (
            <>
              <ConfettiCannon
                count={50}
                origin={{ x: -10, y: 0 }}
                autoStartDelay={0}
                onAnimationEnd={() => setShowConfetti(false)}
                colors={color}
                fadeOut={true}
              />
              <ConfettiCannon
                count={50}
                origin={{ x: 0, y: -10 }}
                autoStartDelay={100}
                onAnimationEnd={() => setShowConfetti(false)}
                colors={color}
                fadeOut={true}
              />
            </>
          )}
          <Text style={styles.text}>Bebi "{copos}" copos de água.</Text>
          <Text
            style={styles.button}
            accessibilityLabel="Beber"
            onPress={addCopo}
          >
            Beber
          </Text>
          <Text
            style={styles.button}
            accessibilityLabel="Dis-Beber"
            onPress={remoCopos}
          >
            Dis-Beber
          </Text>
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
    textAlign: "center",
  },
  camera: {
    width: 500,
    height: 500,
    textAlign: "center",
  },
  loading: {
    flex: 1,
    backgroundColor: "#1E3B81",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
  },
  button: {
    fontSize: 30,
    margin: 50,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    backgroundColor: "#1f9ace",
    textAlign: "center",
  },
});
