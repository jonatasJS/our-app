// Pagina de perfil
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Linking, View, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  Button,
  shadow,
} from "react-native-paper";
import * as Google from "expo-google-app-auth";

import {
  ProfileStyle,
  TextStyle,
  UserInfoSection,
} from "../../styles/ProfileStyles";

interface DataTypes {
  picture: string;
  name: string;
  email: string;
}

export default function ProfileScreen() {
  const [data, setData] = useState({} as DataTypes);
  const [userData, setUseData] = useState({} as DataTypes);
  const [accessToken, setAccessToken] = useState(null);

  // useEffect(() => {
  //   setTimeout(async () => {
  //     await fetch("https://api.github.com/users/jonatasjs")
  //       .then(async (response) => await response.json())
  //       .then(async (json) => await setData(json));
  //   }, 1);
  // }, []);
  console.log(userData);
  console.log(accessToken);

  async function handleLogin() {
    try {
      console.log("Login");
      const result = await Google.logInAsync({
        androidClientId: "234834103311-ien344co0l8svq4910e72n4r14gvjbd3.apps.googleusercontent.com",
        iosClientId: "234834103311-8a9h9btm6354rp7qh5tkidsjlmtk7o1k.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        setAccessToken(result.accessToken);
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error:", e);
      Alert.alert("Erro ao fazer login", "Tente novamente mais tarde\n" + e);;
    }
  }

  async function handleGetUserData() {
    try {
      console.log(accessToken);
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.json();
      setUseData(data);
    } catch (error) {
      console.log("error:", error);
      Alert.alert("Erro ao buscar dados", "Tente novamente mais tarde\n" + error);;
    }
  }

  function showUserData() {
    if (userData.name) {
      return (
        <View style={ProfileStyle.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: userData.picture,
              }}
              size={80}
            />
            <View style={{ marginLeft: 20 }}>
              <Title style={[TextStyle.title, { marginTop: 15, marginBottom: 5 }]}>
                {userData.name}
              </Title>
              <Caption style={TextStyle.caption}>{userData.email}</Caption>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        // <View style={styles.loading}>
        //   <Image source={require("../../assets/splash-animate.gif")} />
        //   <Text style={styles.loadingText}>Carregando...</Text>
        // </View>
        ''
      );
    }
  }

  return (
    <ProfileStyle>
      {/* {data.name && (
        <UserInfoSection>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Avatar.Image
              source={{
                uri: data.avatar_url,
              }}
              size={100}
            ></Avatar.Image>
            <View
              style={{
                marginLeft: 170,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <TextStyle>
                {data.followers + "\n"}
                <Caption
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    lineHeight: 14,
                    fontWeight: "bold",
                  }}
                >
                  Seguidores
                </Caption>
              </TextStyle>
              <TextStyle>
                {data.following + "\n"}
                <Caption
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    lineHeight: 14,
                    fontWeight: "bold",
                  }}
                >
                  Seguindo
                </Caption>
              </TextStyle>
            </View>
          </View>
          <Title
            onPress={async () => await Linking.openURL(data.blog)}
            style={{
              marginTop: 10,
              marginBottom: 5,
              fontSize: 24,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {data.name}
          </Title>
          <Caption
            style={{
              fontSize: 14,
              color: "#fff",
              lineHeight: 14,
              fontWeight: "bold",
            }}
            onPress={async () => await Linking.openURL(data.blog)}
          >
            @{data.login}
          </Caption>
          <Title
            style={{
              marginTop: 10,
              marginBottom: 5,
              fontSize: 14,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {data.bio}
          </Title>
        </UserInfoSection>
      )}
      {!data.name && (
        <View style={styles.loading}>
          <Image source={require("../../assets/splash-animate.gif")} />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )} */}
      {!userData.name && <TextStyle
        onPress={userData.name ? handleGetUserData : handleLogin}
      >
        Entrar
      </TextStyle>}
      {showUserData()}

      <StatusBar style="light" />
    </ProfileStyle>
  );
}

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
