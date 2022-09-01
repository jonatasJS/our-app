import React, { useEffect, useState } from "react";
import { Alert, TextInput, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfettiCannon from "react-native-confetti-cannon";
import { StatusBar } from "expo-status-bar";
import * as Progress from "react-native-progress";
import * as Notifications from 'expo-notifications';
// import { TextInput } from "react-native-paper";

import {
  ButtonsContainerStyle,
  ButtonStyle,
  HomeStyle,
  TextStyle,
} from "../../styles/HomeStyles";
import { Button } from "react-native-paper";

export default function HomeScreen() {
  const [copos, setCopos] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [peso, setPeso] = useState("62" || null);
  const [ml, setMl] = useState("250" || null);
  const [totalMl, setTotalMl] = useState(0);
  const [showContainer, setShowContainer] = useState(false);
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
      if (
        await AsyncStorage.getItem("ml") == ('' || null || undefined) ||
        await AsyncStorage.getItem("peso") == ('' || null || undefined)
      ) return setShowContainer(false);
      
      setCopos(Number(await AsyncStorage.getItem("copos")) || 0);
      setPeso(await AsyncStorage.getItem("peso") || "0");
      setMl(await AsyncStorage.getItem("ml") || "0");
    }, 1);
    // (async () => {
    //   const { status } = await Camera.requestCameraPermissionsAsync();
    //   setHasPermission(status === "granted");
    // })();
  }, []);

  async function addCopo() {
    try {
      setCopos(copos + 1);
      setTotalMl(totalMl + Number(ml));
      await AsyncStorage.setItem("copos", `${copos + 1}`, async () => {
        if (copos == 4) {
          Alert.alert("🎊 Parabéns! 🎉", "Você acaba de beber 5 copos!");
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "🎊 Parabéns! 🎉",
              body: "Você acaba de beber 5 copos!",
              sound: true,
            },
            trigger: { seconds: 1 },
          });
          
          return setShowConfetti(true);
        }

        if (copos == 9) {
          Alert.alert("🎊 Parabéns! 🎉", "Você acaba de beber 10 copos!");
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "🎊 Parabéns! 🎉",
              body: "Você acaba de beber 10 copos!",
              sound: true,
            },
            trigger: { seconds: 1 },
            
          });
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
      setTotalMl(totalMl - Number(ml));
      await AsyncStorage.setItem("copos", `${copos - 1}`, () =>
        Alert.alert("🤨", "Você removeu um copo de água!")
      );
    } catch {
      Alert.alert("Erro", "Erro ao remover copos");
    }
  }

  return (
    <HomeStyle>
      {showContainer && <>
        <TextInput
          autoFocus
          // placeholder="Seu pezo..."
          style={{
            backgroundColor: "#00000050",
            width: "80%",
            color: "#fff",
            marginBottom: 10,
            borderRadius: 10,
            padding: 20,
          }}
          value={peso}
          onChangeText={(text) => setPeso(text)}
        ></TextInput>
        <TextInput
          // placeholder="Seu pezo..."
          style={{
            backgroundColor: "#00000050",
            width: "80%",
            color: "#fff",
            marginBottom: 10,
            borderRadius: 10,
            padding: 20,
          }}
          value={ml}
          onChangeText={(text) => setMl(text)}
        ></TextInput>
        <Button
          style={{
            backgroundColor: "#3498db",
            width: "80%",
            marginBottom: 10,
            borderRadius: 10,
            padding: 20,
          }}
          mode="outlined"
          onPress={async () => {
            if (peso == null) return Alert.alert("Peso inválido!");
            Alert.alert("Peso salvo com sucesso!");
            await AsyncStorage.setItem("peso", peso);
            setShowContainer(true);
          }}
        >
          Teste
        </Button>
      </>}
      {!showContainer && (
        <>
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
          {/* <TextStyle>Seu peso {peso} kg</TextStyle>
          <TextStyle>Seu copo tem {ml} ml</TextStyle>
          <TextStyle>Você tem q beber {(Number(peso)*35).toFixed(2)} litros</TextStyle> */}
          <TextStyle>Bebi "{copos}" copos de água.</TextStyle>
          {/* <TextStyle>Bebi "{totalMl}" ml de água.</TextStyle> */}

          <Progress.Circle
            style={{
              marginTop: 20,
            }}
            progress={((totalMl / (Number(peso)*35)) * 100) / 100}
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
                    {
                      text: "Cancelar",
                      onPress: () => console.log("Cancelar"),
                    },
                    {
                      text: "Confirmar",
                      onPress: async () => {
                        await AsyncStorage.setItem("copos", "0");
                        await AsyncStorage.setItem("totalMl", "0");
                        setCopos(0);
                        setTotalMl(0);
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
        </>
      )}
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
