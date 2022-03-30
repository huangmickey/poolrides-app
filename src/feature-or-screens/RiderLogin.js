import React from "react";
import { View, StyleSheet, Text } from "react-native"
import { colors } from "../utils/colors";

export default function RiderLogin({ navigation }) {

    // TO DO: Replace with your code in return()
    return (
        
        <View style={styles.screenContainer}>
            <View flexGrow={1} alignItems={'center'} justifyContent={'center'}>
                <Text style={styles.text}>Rider Login Page</Text>
            </View>
        </View>
    );

}

// TO DO: Replace with your stylesheet
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: colors.black
    },
    text: {
        color: colors.white,
    }
});