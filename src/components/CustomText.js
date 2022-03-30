import React from "react";
import { Text } from "react-native";
import { colors } from "../utils/colors";

export const CustomText = (props) => {
    const text = props.text.split(' ');
    return <Text>{text.map(text => {
      if (text.startsWith('S')) {
        return <Text style={{ color: 'red' }}>{text} </Text>;
      }
      return `${text} `;
    })}</Text>;
}