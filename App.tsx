import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(33, 35, 36)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "#fff"
  },
  text2: {
    color: "red"
  }
});

