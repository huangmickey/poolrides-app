import { sendEmailVerification } from 'firebase/auth';
import { StyleSheet, Text, View } from 'react-native';
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
    console.log("Is Email Verified? " + authentication.currentUser.emailVerified);
    authentication.signOut();
  }

  return (
    <View style={styles.container}>

      <Text style={styles.thanks}> Thanks for signing up!</Text>
      <Text style={styles.verify}> Press verify your email to continue.</Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          title='Send verification email'
          color={AppStyles.color.mint}
          stretch={true}
          textColor={AppStyles.color.black}
          onPress={verifyEmailDispatcher} />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title='Verified? Sign back in'
          color={AppStyles.color.mint}
          stretch={true}
          textColor={AppStyles.color.black}
          onPress={refreshEmailVerified} />
      </View>
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
  thanks: {
    color: AppStyles.color.platinum,
    fontSize: 30,
    fontWeight: 'bold',
  },
  verify: {
    color: AppStyles.color.platinum,
    fontSize: 15,
    left: 5,
    paddingBottom: "5%"
  },
  buttonContainer: {
    width: "80%",
    marginBottom: "3%"
  },
});