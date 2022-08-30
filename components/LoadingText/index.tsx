import React, { Component } from "react";
// import { Text } from "react-native";
import Typewriter from "typewriter-effect";

interface Props {
  style: object;
}

export default class LoadingText extends Component<Props> {
  render() {
    return (
      <Typewriter
        onInit={(typewriter) => {
          typewriter

            .typeString("Carregando...")

            .pauseFor(500)
            .deleteAll()
            .start();
        }}
      />
      // <Typist>
      //   <Text style={this.props.style}>Carregando...</Text>
      // </Typist>
    );
  }
}
