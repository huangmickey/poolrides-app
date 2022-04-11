import { StyleSheet, Text, View} from 'react-native';
import { AppStyles } from '../utils/styles';
import { fetchUser } from '../utils/http';

export default function RiderDashboard({ navigation }) {
    // const data = fetchUser();
    // console.log(data);

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