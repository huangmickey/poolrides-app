import {Button} from "react-native"
// https://github.com/rcaferati/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button"; 
import { StyleSheet, View } from "react-native"
import { colors } from "../utils/colors";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";


export default function CustomButton({ title, color, textColor, onPress }) {

    return (
        <AwesomeButton 
                stretch={true}
                width={null}
                backgroundColor={color}
                textColor={textColor}
                borderRadius={50}
                onPress={onPress}
                raiseLevel={3}
                springRelease={true}
                textSize={16}
                backgroundDarker={colors.salmonred}
            >
                {title}
            </AwesomeButton>
        // <Button 
        // title={title} 
        // color={color} 
        // onPress={onPress} 
        // />
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.black,
    }


});