import React from 'react'
import { SafeAreaView, Text, StyleSheet, View } from 'react-native'
import CustomButton from '../../components/CustomButton';
import { AppStyles } from '../../utils/styles';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function DriverRideComplete() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <ConfettiCannon fallSpeed={5000} count={200} origin={{ x: -10, y: 0 }} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Your ride is complete!
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton stretch={false} title={"Complete"} color={AppStyles.color.mint} textColor={AppStyles.color.black} onPress={onPressHandler} />
      </View>

    </SafeAreaView>
  )


  function onPressHandler() {
    navigation.navigate("Driver Dashboard")
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.black,
    alignItems: 'center',
  },
  text: {
    color: AppStyles.color.platinum,
    fontSize: AppStyles.fontSize.title,
  },
  textContainer: {
    paddingTop: '40%',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingTop: '20%',
  }
});

