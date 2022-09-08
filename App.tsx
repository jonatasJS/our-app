import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnimateNumber from "react-native-animate-number";
import * as Notifications from "expo-notifications";
import * as Update from "expo-updates";

import { AddRemoveButton } from "./components/AddRemoveButton";

const amounts = [200, 250, 500];

// Async Storage
const storeData = async (value, key = "@amount") => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key, setValue) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      setValue(Number(value));
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

const renderConfetti = () => {
  return <ConfettiCannon
    count={100}
    origin={{ x: 0, y: 0 }}
    fadeOut={true}

  />;
};

// Notifications
async function scheduleNotification() {
  await Notifications.requestPermissionsAsync().then(async (permission) => {
    console.log("permission", permission);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Beba água!",
        subtitle: "🚰 Não se esqueça de beber água",
        body: "🤪 É hora de beber água",
        priority: Notifications.AndroidNotificationPriority.HIGH,
        sticky: true,
        sound: true,
        vibrate: [0, 250, 0, 250, 0, 250],
      },
      trigger: {
        repeats: true,
        // seconds: 10
        seconds: 1800,
      },
    }).then((notification) => {
      console.log("notification", notification);
    });
  });
}

export default function App() {
  const [fillingPercentage, setFillingPercentage] = useState(0);
  const [waterGoal, setWaterGoal] = useState(3000);
  const [waterDrank, setWaterDrank] = useState(0);
  const [day, setDay] = useState(new Date().getDate());
  const [isGoalAchieved, setIsGoalAchieved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Progress Bar Animation
  const barHeight = useRef(new Animated.Value(0)).current;
  const progressPercent = barHeight.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", `100%`],
  });

  useEffect(() => {
    getData("@day", setDay);
    getData("@amount", setWaterDrank);
    getData("@goal", setWaterGoal);
    (async () => {
      await Update.checkForUpdateAsync().then(async (update) => {
        if (update.isAvailable) {
          await Update.fetchUpdateAsync().then(async () => {
            await Update.reloadAsync();
          });
        }
      });
      await scheduleNotification();
    })();
  }, []);

  useEffect(() => {
    Animated.timing(barHeight, {
      duration: 1000,
      toValue: fillingPercentage / 3,
      useNativeDriver: false,
    }).start();

    // Se o dia de hoje for diferente do dia que já está salvo no async storage, então resetar o valor de agua bebida
    const today = new Date().getDate();
    getData("@day", (day) => {
      if (day !== today) {
        storeData(today.toString(), "@day");
        storeData("0", "@amount");
        setWaterDrank(0);
      }
    });
  }, [fillingPercentage]);

  // End of Progress Bar Animation
  useEffect(() => {
    storeData(waterGoal.toString(), "@goal");
  }, [waterGoal]);

  useEffect(() => {
    storeData(waterDrank.toString(), "@amount");
  }, [waterDrank]);

  useEffect(() => {
    // percentage = waterDrank * 100 / waterGoal
    let percentage = (waterDrank * 100) / waterGoal;
    let fillingP = (percentage * 300) / 100;
    setFillingPercentage(fillingP > 300 ? 300 : fillingP);
  }, [waterGoal, setFillingPercentage, waterDrank]);

  useEffect(() => {
    if (waterDrank >= waterGoal && isGoalAchieved === false) {
      setIsGoalAchieved(true);
    }
    if (waterDrank < waterGoal && isGoalAchieved === true) {
      setIsGoalAchieved(false);
    }

    if (showConfetti === false && isGoalAchieved === true) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  }, [waterDrank, isGoalAchieved, waterGoal]);

  return (
    <SafeAreaView style={styles.container}>
      {showConfetti && renderConfetti()}

      {/* Water Goal */}
      <View style={styles.waterGoalContainer}>
        <Text
          style={[
            styles.blueText,
            {
              fontSize: 22,
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          Seu objetivo
        </Text>

        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              styles.grayText,
              {
                fontSize: 26,
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            {waterGoal} ml{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            {/* Add Goal */}
            <TouchableOpacity
              style={{
                padding: 5,
                marginRight: 20,
                marginTop: 10
              }}
              onPress={() => {
                if(waterGoal <= 200) return setWaterGoal(200);
                setWaterGoal(waterGoal - 200)
              }}
            >
              <Ionicons name="remove-circle" size={26 * 2} color="#2389da" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 5,
                marginLeft: 20,
                marginTop: 10
              }}
              onPress={() => {
                setWaterGoal(waterGoal + 200)
              }}
            >
              <Ionicons name="add-circle" size={26 * 2} color="#2389da" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ProgressView */}
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* Water You've Drunk Label */}
        <View style={{ justifyContent: "center" }}>
          <Text style={[styles.grayText, { fontSize: 28 }]}>Você bebeu</Text>
          <Text style={[styles.blueText, { fontSize: 42 }]}>
            {waterDrank} ml
          </Text>
          <Text style={[styles.grayText, { fontSize: 33, marginTop: -5 }]}>
            de água.
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={{
              height: progressPercent,
              backgroundColor: "#5abcd8",
              borderRadius: 40,
            }}
          />
          <AnimateNumber
            style={[
              styles.blueText,
              {
                fontSize: 33,
                right: -120,
                position: "absolute",
                marginLeft: -120,
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
            value={fillingPercentage}
            formatter={(val) => `${(val / 3).toFixed(0)}%`}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Add Water */}
        <View style={styles.waterButtonsContainer}>
          {amounts.map((amount) => {
            return (
              <AddRemoveButton
                key={"add" + amount}
                amount={amount}
                value={waterDrank}
                setValue={setWaterDrank}
                operation="add"
              />
            );
          })}
        </View>

        {/* Remove Water */}
        <View style={styles.waterButtonsContainer}>
          {amounts.map((amount) => {
            return (
              <AddRemoveButton
                key={"remove" + amount}
                amount={amount}
                value={waterDrank}
                setValue={setWaterDrank}
                operation="remove"
              />
            );
          })}
        </View>
      </View>

      <View
        style={{
          paddingVertical: 20,
          flexDirection: "row",
          width: "90%",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={[
            styles.notificationButton,
            {
              backgroundColor: "#74ccf4",
            },
          ]}
          onPress={() => scheduleNotification()}
        >
          <Text style={styles.notificationText}>Agendar notificação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.notificationButton,
            {
              backgroundColor: "red",
            },
          ]}
          onPress={async () =>
            await Notifications.cancelAllScheduledNotificationsAsync()
          }
        >
          <Text style={styles.notificationText}>Cancelar notificações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  progressBarContainer: {
    borderRadius: 40,
    borderWidth: 1,
    width: 40,
    height: 300,
    justifyContent: "flex-end",
  },
  waterButtonsContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    width: "90%",
    justifyContent: "space-around",
  },
  waterGoalContainer: {
    padding: 50,
    alignItems: "center",
  },
  blueText: {
    color: "#1ca3ec",
    fontWeight: "600",
  },
  grayText: { color: "#323033", fontWeight: "600" },
  notificationButton: {
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    padding: 10,
  },
  notificationText: { color: "white", fontWeight: "500", fontSize: 16 },
});
