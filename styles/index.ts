import { StyleSheet } from "react-native";

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
    height: 200,
    marginLeft: -10,
    marginBottom: 10,
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
    color: '#00aaff',
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

export default styles;
