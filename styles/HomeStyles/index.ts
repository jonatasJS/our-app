import styled from "styled-components/native";

export const HomeStyle = styled.View`
  flex: 1;
  background-color: #1e3b81;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
`;

export const TextStyle = styled.Text`
  font-size: 30px;
  color: #fff;
  text-align: center;
`;

export const ButtonsContainerStyle = styled.View`
  flex-direction: row;
  gap: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
  bottom: 0;
  margin-top: -40px;
`;

export const ProgressStyle = styled.View`
  flex: 1;
  width: 50%;
  height: 100px;
  border-radius: 50%;
`;

export const ButtonStyle = styled.TouchableOpacity`
  font-size: 30px;
  margin: 50px;
  border-radius: 100px;
  padding-bottom: 20px;
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  color: #fff;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: #1f9ace;
  text-align: center;
`;
