import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, Text, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Camera, CameraType } from "expo-camera";
import Typist from "react-typist";
// import * as Notifications from 'expo-notifications';
import ConfettiCannon from "react-native-confetti-cannon";

export default function App() {
  // const [hasPermission, setHasPermission] = useState(null);
  // const [type, setType] = useState(CameraType.back);
  const [copos, setCopos] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

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
    setTimeout(() => {
      setIsLoading(false); // seta o loading para false
    }, 3000);
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

        setShowConfetti(false);
        Alert.alert("Parabéns! 🎊", "Mais um copo de água bebido!");
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
          "Você não bebeu agua hoje!\nAnda, vá beber agua 😉"
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
    <>
      {isLoading && (
        <View style={styles.loading}>
          <Image source={require("./assets/splash-animate.gif")} />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}
      {!isLoading && (
        <View style={styles.container}>
          {showConfetti && (
            <ConfettiCannon
              count={200}
              origin={{ x: -10, y: 0 }}
              autoStartDelay={0}
              onAnimationEnd={() => setShowConfetti(false)}
              colors={[
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
              ]}
              fadeOut={true}
            />
          )}
          <Text style={styles.text}>Bebi "{copos}" copos de agua.</Text>
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
          {/* {!hasPermission ? (
            <Text style={styles.text}>Sem acesso a camera</Text>
          ) : (
            <>
              <Camera
                autoFocus
                type={type}
                style={styles.camera}
              />
              <Text
                style={styles.button}
                accessibilityLabel="Trocar camera"
                onPress={() => {
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
              >
                Trocar camera
              </Text>
            </>
          )} */}

          {/* <Text
            style={styles.button}
            accessibilityLabel="Limpar"
            onPress={async () => {
              console.log("Sobre", await AsyncStorage.getItem("copos"))
              console.log("Sobre", copos)
              Alert.alert("Sobre", "Sobre o app");
            }}
          >
            TESTE
          </Text> */}
          <StatusBar style="light" />
        </View>
      )}
    </>
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
  camera: {
    width: 500,
    height: 500,
  },
  loading: {
    flex: 1,
    backgroundColor: "#1E3B81",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  loadingText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 30,
    color: "#fff",
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
  },
});

/*

import moment from 'moment';
import {
  titleTimer,
  hearthTimer,
  daysTimer,
  hoursTimer,
  minutesTimer,
  secondsTimer
} from './utils/timers';

export default function App() {
  const aniv = moment([new Date().getFullYear(), 11, 30]);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function start() {
    setInterval(() => {
      const now = moment([
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDay(),
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds()
      ]);
      
      setDays(aniv.diff(now, 'days'));
      setHours(aniv.diff(now, 'hours'));
      setMinutes(aniv.diff(now, 'minutes'));
      setSeconds(aniv.diff(now, 'seconds'))
    }, 1000);
  }

  useEffect(start, []);

  return (
    <View style={styles.container}>
      {titleTimer.indexOf(new Date().getSeconds()) != -1 && <Text style={styles.text}>oie meu amor!</Text>}
      {hearthTimer.indexOf(new Date().getSeconds()) != -1 && <Text style={styles.text2}>❤❤❤</Text>}
      {daysTimer.indexOf(new Date().getSeconds()) != -1 && <Text style={styles.text}>falta {days} dias</Text>}
      {hoursTimer.indexOf(new Date().getSeconds()) != -1 && <Text style={styles.text}>falta {hours} horas</Text>}
      {minutesTimer.indexOf(new Date().getSeconds()) != -1 && <Text style={styles.text}>falta {minutes} minutos</Text>}
      {secondsTimer.indexOf(new Date().getSeconds()) != -1 && <Text style={styles.text}>falta {seconds} segundos</Text>}
      <StatusBar style="light" />
    </View>
  );
}

*/
