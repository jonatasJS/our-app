import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, AsyncStorage, Alert } from 'react-native';

export default function App() {
  const [copos, setCopos] = useState(Number(AsyncStorage.getItem('copos')) || 0);

  useEffect(() => {
    setCopos(Number(AsyncStorage.getItem('copos')) || 0);
  }, [])

  async function addCopo() {
    try {
      setCopos(copos + 1);
      await AsyncStorage.setItem('copos', String(copos + 1));
    } catch {
      Alert.alert('Erro', 'Erro ao adicionar copo');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bebi "{copos}" copos de agua.</Text>
      <Text
        style={styles.button}
        accessibilityLabel="Beber"
        onPress={addCopo}
      >{"Beber"}</Text>
      <Text
        style={styles.button}
        accessibilityLabel="Limpar"
        onPress={() => setCopos(0)}
      >Zerar</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3437',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  },
  text: {
    fontSize: 30,
    color: "#fff"
  },
  button: {
    fontSize: 30,
    margin: 50,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    color: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: '#1f9ace'
  }
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
