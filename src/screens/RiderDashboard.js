import { StyleSheet, Text, View} from 'react-native';
import { AppStyles } from '../utils/styles';

export default function RiderDashboard({ navigation }) {

    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>Welcome Rider! This is Rider Dashboard</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppStyles.color.black,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: AppStyles.color.white,
    },
});