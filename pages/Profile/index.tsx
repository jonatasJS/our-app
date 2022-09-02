// Pagina de perfil
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Linking, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import {
  ProfileStyle,
  TextStyle,
  UserInfoSection,
} from "../../styles/ProfileStyles";

interface DataTypes {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  company: string;
  location: string;
  blog: string;
  following: number;
  followers: number;
}

export default function ProfileScreen() {
  const [data, setData] = React.useState({} as DataTypes);

  useEffect(() => {
    setTimeout(async () => {
      await fetch("https://api.github.com/users/jonatasjs")
        .then(async (response) => await response.json())
        .then(async (json) => await setData(json));
    }, 1);
  }, []);

  return (
    <ProfileStyle>
      {data && (
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
      )}

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
