import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Alert,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AnimateNumber from "react-native-animate-number";
import * as Notifications from "expo-notifications";
import * as Update from "expo-updates";
import Modal from "react-native-modal";
import moment, { locale } from "moment";

import { AddRemoveButton } from "./components/AddRemoveButton";
import { NewLineKind } from "typescript";

const amounts = [200, 250, 500];

// Async Storage
const storeData = async (value, key = "@amount") => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    Alert.alert("Erro ao salvar dados");
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
    Alert.alert("Erro ao ler dados");
  }
};

// Notifications
async function scheduleNotification() {
  await Notifications.requestPermissionsAsync().then(async (permission) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Beba água!",
        body: "🤪 É hora de beber água",
        sound: true,
        vibrate: [0, 250, 0, 250, 0, 250],
      },
      trigger: {
        repeats: true,
        // seconds: 10
        seconds: 1800,
      },
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
  const [showModal, setShowModal] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#1ca3ec");
  const [isNotitications, setIdNotifications] = useState(false);
  const [momentNow, setMomentNow] = useState(moment().format("HH:mm"));
  const [dateNow, setDatetNow] = useState(moment().format("DD/MM"));
  const [weekday, setEeekday] = useState(moment().format("ddd"));
  const [period, setPeriod] = useState("");
  const [isShowUnderline, setIsShowUnderline] = useState(false);
  const today = new Date().getDate();
  
  const renderConfetti = () => {
    return (
      <ConfettiCannon
        count={100}
        origin={{ x: 0, y: 0 }}
        onAnimationEnd={() => setShowConfetti(false)}
        fadeOut={true}
      />
    );
  };

  // Progress Bar Animation
  const barHeight = useRef(new Animated.Value(0)).current;
  const progressPercent = barHeight.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", `100%`],
  });

  useEffect(() => {
    getData("@day", setDay);
    getData("@amount", setWaterDrank);
    getData("@goal", setWaterGoal); // Se o dia de hoje for diferente do dia que já está salvo no async storage, então resetar o valor de agua bebida
    periodAmimate();
    (async () => {
      await Update.checkForUpdateAsync().then(async (update) => {
        if (update.isAvailable) {
          await Update.fetchUpdateAsync().then(async () => {
            await Update.reloadAsync();
          });
        }
      });
      await getData("@day", (day) => {
        if (day !== today) {
          storeData(today.toString(), "@day");
          storeData("0", "@amount");
          setWaterDrank(0);
        }
      });
      await getData("@notification", (notification) => {
        Alert.alert("notification", notification);
        if (notification === "true") {
          setIdNotifications(true);
        } else {
          setIdNotifications(false);
        }
      });
    })();
    
    setInterval(() => {
      setMomentNow(moment().format("HH:mm"));
      setDatetNow(moment().format("DD/MM"));
      setEeekday(moment().format("ddd"));
      // setIsShowUnderline(!isShowUnderline);
      if (moment().format("HH:mm") === "00:00") {
        storeData("0", "@amount");
        storeData(today.toString(), "@day");
        setWaterDrank(0);
      }
      // function to check if it is morning, afternoon or evening
      if (
        Number(moment().format("HH")) < 12 &&
        Number(moment().format("HH")) >= 6
      ) {
        setPeriod("Bom dia!");
      } else if (
        Number(moment().format("HH")) >= 12 &&
        Number(moment().format("HH")) < 18
      ) {
        setPeriod("Boa tarde!");
      } else {
        setPeriod("Boa noite!");
      }
    }, 1000);
  }, []);

  useEffect(() => {
    Animated.timing(barHeight, {
      duration: 1000,
      toValue: fillingPercentage / 3,
      useNativeDriver: false,
    }).start();
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      // shadowColor: "#000",
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // }
    },
    modalText: {
      marginBottom: 30,
      textAlign: "center",
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "50%",
    },
    button: {
      height: 40,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 20,
      paddingRight: 20,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
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
      color: primaryColor,
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

  const periodRef = useRef(new Animated.Value(-60)).current;

  const periodAmimate = () => {
    Animated.timing(periodRef, {
      toValue: 0,
      delay: 1000,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      {showConfetti && renderConfetti()}

      {/* Modal */}
      <Modal
        animationIn={"slideInLeft"}
        animationOut={"slideOutRight"}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}
        style={{ margin: 0 }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {isNotitications
                ? "Você deseja desativar as notificações?"
                : "Você quer ser notificado a cada 30 minutos para beber água?"}
            </Text>

            <View style={styles.modalButtons}>
              {!isNotitications && (
                <>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: "#25f321",
                      },
                    ]}
                    onPress={async () => {
                      await scheduleNotification();
                      setShowModal(false);
                      setPrimaryColor("#25f321");
                      setIdNotifications(true);
                      await storeData("true", "@notification");
                    }}
                  >
                    <Text style={styles.buttonText}>Sim</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: "red",
                      },
                    ]}
                    onPress={async () => {
                      await Notifications.cancelAllScheduledNotificationsAsync();
                      setShowModal(false);
                      setPrimaryColor("#1E90FF");
                      setIdNotifications(false);
                      await storeData("false", "@notification");
                    }}
                  >
                    <Text style={styles.buttonText}>Não</Text>
                  </TouchableOpacity>
                </>
              )}
              {isNotitications && (
                <>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: "red",
                      },
                    ]}
                    onPress={async () => {
                      await Notifications.cancelAllScheduledNotificationsAsync();
                      setShowModal(false);
                      setPrimaryColor("#1E90FF");
                      setIdNotifications(false);
                      await storeData("false", "@notification");
                    }}
                  >
                    <Text style={styles.buttonText}>Sim</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: "#25f321",
                      },
                    ]}
                    onPress={async () => {
                      setShowModal(false);
                      setPrimaryColor("#25f321");
                      setIdNotifications(true);
                      await storeData("true", "@notification");
                    }}
                  >
                    <Text style={styles.buttonText}>Não</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* Relogio em tempo real */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "row",
          width: "70%",
          height: "5%",
          marginBottom: -90,
          marginTop: 10,
          backgroundColor: "#fff",
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          zIndex: 2,
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            // borderColor: isShowUnderline ? "#1e8fff4a" : "#00000000",
            // borderWidth: 2,
            // borderRadius: 10,
            // paddingTop: 2,
            // paddingBottom: 2,
            // paddingLeft: 7,
            // paddingRight: 5,
          }}
        >
          {momentNow}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          <Text>{dateNow} </Text>
          {weekday === "Sun"
            ? "Dom"
            : weekday === "Mon"
            ? "Seg"
            : weekday === "Tue"
            ? "Ter"
            : weekday === "Wed"
            ? "Qua"
            : weekday === "Thu"
            ? "Qui"
            : weekday === "Fri"
            ? "Sex"
            : "Sáb"}
        </Text>
      </View>
      <Animated.View
        style={{
          width: "50%",
          height: "3.5%",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          backgroundColor: "#fff",
          borderRadius: 10,
          marginTop: -45,
          translateY: periodRef,
          marginBottom: -120,
          zIndex: 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text>{period}</Text>
      </Animated.View>

      {/* Water Goal */}
      <View
        style={[
          styles.waterGoalContainer,
          {
            marginBottom: -50,
          },
        ]}
      >
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
                marginTop: 10,
              }}
              onPress={() => {
                if (waterGoal <= 200) return setWaterGoal(200);
                setWaterGoal(waterGoal - 200);
              }}
            >
              <Ionicons
                name="remove-circle"
                size={26 * 2}
                color={primaryColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 5,
                marginLeft: 20,
                marginTop: 10,
              }}
              onPress={() => {
                setWaterGoal(waterGoal + 200);
              }}
            >
              <Ionicons name="add-circle" size={26 * 2} color={primaryColor} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* <BannerAd
        unitId="ca-app-pub-5593915309329672/3986228611"
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> */}

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
              backgroundColor: primaryColor,
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
                primaryColor={primaryColor}
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
                primaryColor={primaryColor}
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
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={[
            styles.notificationButton,
            {
              backgroundColor: isNotitications ? primaryColor : "red",
            },
          ]}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.notificationText}>Agendar notificação</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[
            styles.notificationButton,
            {
              backgroundColor: "red",
            },
          ]}
          onPress={}
        >
          <Text style={styles.notificationText}>Cancelar notificações</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}
