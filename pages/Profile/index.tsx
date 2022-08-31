// Pagina de perfil
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, View } from "react-native";
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
      <UserInfoSection>
        <View
          style={{
            flexDirection: "row",
            marginTop: 50,
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
              marginLeft: 20,
            }}
          >
            <Title
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
            >
              @{data.login}
            </Caption>
          </View>
        </View>
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
      <StatusBar style="light" />
    </ProfileStyle>
  );
}
