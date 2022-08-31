import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const Tab = createBottomTabNavigator();

import HomeScreen from "./pages/Home/index";
import ProfileScreen from "./pages/Profile/index";
import SettingsScreen from "./pages/Settings/index";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // seta o loading para false
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      {isLoading && (
        <View style={styles.loading}>
          <Image source={require("./assets/splash-animate.gif")} />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}
      {!isLoading && <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            borderTopWidth: 0,

            bottom: 14,
            left: 14,
            right: 14,
            elevation: 0,
            borderRadius: 50,
            height: 60
          }
        }}
       >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => {
              if (focused)
                return <Ionicons name="ios-home" size={size} color={color} />;
              return (
                <Ionicons name="ios-home-outline" size={size} color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => {
              if (focused)
                return (
                  <Ionicons name="ios-settings" size={size} color={color} />
                );
              return (
                <Ionicons
                  name="ios-settings-outline"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => {
              if (focused)
                return <Ionicons name="ios-person" size={size} color={color} />;
              return (
                <Ionicons name="ios-person-outline" size={size} color={color} />
              );
            },
          }}
        />
      </Tab.Navigator>}
    </NavigationContainer>
  );
}

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

const styles = StyleSheet.create({
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
  }
});