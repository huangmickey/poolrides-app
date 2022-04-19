import { sendEmailVerification } from 'firebase/auth';
import { StyleSheet, Text, View} from 'react-native';
import { authentication } from '../../firebase/firebase-config';
import { AppStyles } from '../../utils/styles'
import CustomButton from '../../components/CustomButton';

export default function VerifyAccount({ navigation }) {
  function verifyEmailDispatcher() {
    sendEmailVerification(authentication.currentUser)
    .then(() => {
        console.log('email verification sent');
    });
  }

  function refreshEmailVerified() {
    console.log(authentication.currentUser.emailVerified);
    authentication.currentUser.reload();
  }

  return (
      <View style = {styles.container}>
          <Text style = {styles.text}> Please Verify email now</Text>
          <CustomButton 
            title='Send verification email' 
            color={AppStyles.color.mint} 
            textColor={AppStyles.color.white} 
            onPress={verifyEmailDispatcher}/>

            <CustomButton 
            title='Verified? Sign back in' 
            color={AppStyles.color.mint} 
            textColor={AppStyles.color.white} 
            onPress={refreshEmailVerified}/>

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