import { StyleSheet, Text, View} from 'react-native';
import { AppStyles } from '../../utils/styles';
import CustomButton from '../../components/CustomButton';
import { authentication } from '../../firebase/firebase-config';

export default function DriverDashboard({ navigation }) {
  function logoutHandler() {
    console.log("User Logged Out");
    authentication.signOut();
  }

  return (
      <View style = {styles.container}>
          
          <Text style = {styles.text}>Welcome Driver! This is Driver Dashboard</Text>
          <CustomButton 
            title='Log out' 
            color={AppStyles.color.mint} 
            textColor={AppStyles.color.white} 
            onPress={logoutHandler}/>
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