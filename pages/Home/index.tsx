import React, { useEffect, useState } from "react";
import { TouchableOpacity, Alert, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfettiCannon from "react-native-confetti-cannon";
import { StatusBar } from "expo-status-bar";
import * as Progress from 'react-native-progress';

import {
  ButtonsContainerStyle,
  ButtonStyle,
  HomeStyle,
  ProgressStyle,
  TextStyle,
} from "../../styles/HomeStyles";

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
    <HomeStyle>
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
      <TextStyle>Bebi "{copos}" copos de água.</TextStyle>

      <Progress.Circle
        style={{
          marginTop: 20,
        }}
        progress={((copos / 10) * 100)/100}
        size={120}
        thickness={10}
        showsText={true}
      />

        <ButtonStyle accessibilityLabel="Beber" onPress={addCopo}>
          <TextStyle>Beber</TextStyle>
        </ButtonStyle>
      <ButtonsContainerStyle>
        <ButtonStyle accessibilityLabel="Retirar" onPress={remoCopos}>
          <TextStyle>Retirar</TextStyle>
        </ButtonStyle>

        <ButtonStyle
          accessibilityLabel="Zerar"
          onPress={() => {
            Alert.alert(
              "Zerar 😲",
              "Você quer zerar o contador de copos de água!",
              [
                { text: "Cancelar", onPress: () => console.log("Cancelar") },
                {
                  text: "Confirmar",
                  onPress: async () => {
                    await AsyncStorage.setItem("copos", "0");
                    setCopos(0);
                  },
                },
              ]
            );
          }}
        >
          <TextStyle>Zerar</TextStyle>
        </ButtonStyle>
      </ButtonsContainerStyle>

      <StatusBar style="light" />
    </HomeStyle>
  );
}

/*
<ButtonsContainerStyle
        data={[
          {
            accessibilityLabel: "Beber",
            onPress: addCopo,
            id: 1
          },
          {
            accessibilityLabel: "Dis-Beber",
            onPress: remoCopos,
            id: 2
          },
          {
            accessibilityLabel: "Zerar",
            onPress: () => {
              Alert.alert(
                "Zerar 😲",
                "Você quer zerar o contador de copos de água!",
                [
                  { text: "Cancelar", onPress: () => console.log("Cancelar") },
                  {
                    text: "Confirmar",
                    onPress: async () => {
                      await AsyncStorage.setItem("copos", "0");
                      setCopos(0);
                    },
                  },
                ]
              );
            },
            id: 3
          },
        ]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ButtonStyle
            accessibilityLabel={item.accessibilityLabel}
            onPress={item.onPress}
          >
            <TextStyle>{item.accessibilityLabel}</TextStyle>
          </ButtonStyle>
        )}
      />
    */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1E3B81",
//     alignItems: "center",
//     justifyContent: "center",
//     display: "flex",
//     textAlign: "center",
//   },
//   text: {
//     fontSize: 30,
//     color: "#fff",
//     textAlign: "center",
//   },
//   button: {
//     fontSize: 30,
//     margin: 50,
//     paddingBottom: 20,
//     paddingTop: 20,
//     paddingLeft: 40,
//     paddingRight: 40,
//     color: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     display: "flex",
//     backgroundColor: "#1f9ace",
//     textAlign: "center",
//   },
// });
