// https://github.com/rcaferati/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import { AppStyles } from '../utils/styles';

export default function CustomButton({ title, color, textColor, onPress, stretch, width }) {

    return (
        <AwesomeButton
            stretch={stretch}
            width={width}
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