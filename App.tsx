import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, Text, View, Alert, PermissionsAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Notifications from 'expo-notifications';

export default function App() {
  const [copos, setCopos] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      setCopos(Number(await AsyncStorage.getItem("copos")) || 0);
    }, 1);
    setTimeout(() => {
      setIsLoading(false); // seta o loading para false
    }, 3000);
  }, []);

  async function addCopo() {
    try {
      setCopos(copos + 1);
      await AsyncStorage.setItem("copos", `${copos + 1}`, () => '');
    } catch {
      Alert.alert("Erro", "Erro ao adicionar copo");
    }
  }

  async function remoCopos() {
    try {
      setCopos(0);
      await AsyncStorage.setItem("copos", `${0}`, () => '');
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
          <Text style={styles.text}>Bebi "{copos}" copos de agua.</Text>
          <Text
            style={styles.button}
            accessibilityLabel="Beber"
            onPress={addCopo}
          >
            {"Beber"}
          </Text>
          <Text
            style={styles.button}
            accessibilityLabel="Limpar"
            onPress={remoCopos}
          >
            Zerar
          </Text>
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
