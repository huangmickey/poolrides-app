import { Button, View } from "react-native"
// https://github.com/rcaferati/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import { StyleSheet } from "react-native"
import { AppStyles } from '../utils/styles';

export default function CustomButton({ title, color, textColor, onPress, stretch, ...props }) {

    return (
        <View {...props}>
            <AwesomeButton
                stretch={stretch}
                width={null}
                backgroundColor={color}
                textColor={textColor}
                borderRadius={50}
                onPress={onPress}
                raiseLevel={3}
                springRelease={true}
                textSize={16}
                backgroundDarker={AppStyles.color.salmonred}
            >
                {title}
            </AwesomeButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppStyles.color.black,
    }


});