import { StyleSheet, TextInput,Text, View, Button} from 'react-native';

import CustomButton from '../../components/CustomButton';
import { AppStyles } from '../../utils/styles';
import { db, authentication } from '../../firebase/firebase-config';

export default function RiderDashboard({ navigation }) {
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