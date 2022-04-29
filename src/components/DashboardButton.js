// https://github.com/rcaferati/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button"; 
import { StyleSheet } from "react-native"
import { AppStyles } from '../utils/styles';


export default function CDashboardButton({ title, color, textColor, onPress }) {

    return (
        <AwesomeButton 
                stretch={false}
                width={94}
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
    );
}