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
    console.log(authentication.currentUser.emailVerified);
    authentication.signOut();
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: '10%' }}>
        <Text style={styles.thanks}> Thanks for signing up!</Text>
        <Text style={styles.verify}> Press verify your email to continue</Text>
      </View>
      <View style={{ paddingBottom: '5%' }}>
        <CustomButton
          title='Send verification email'
          color={AppStyles.color.mint}
          textColor={AppStyles.color.black}
          onPress={verifyEmailDispatcher} />
      </View>
      <View>
        <CustomButton
          title='Verified? Sign back in'
          color={AppStyles.color.mint}
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
    justifyContent: "center"

  },
  thanks: {
    color: AppStyles.color.platinum,
    fontSize: 30,
    fontWeight: '900',
  },
  verify: {
    color: AppStyles.color.gray,
    fontWeight: '500',
    fontSize: 15,
    left: 5,
  }
});