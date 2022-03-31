import React from "react";
import { View, StyleSheet, Text } from "react-native"
import { colors } from "../utils/colors";

export default function DriverLogin({ navigation }) {

    return (
        <View style={styles.screenContainer}>
            <View flexGrow={1} alignItems={'center'} justifyContent={'center'}>
                <Text style={styles.text}>Driver Login Page</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: colors.black
    },
    text: {
        color: "white",
    }
});