import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RideRequest({ navigation }) {

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>

      </View>

      <View style={styles.driverHUD}></View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '35%',
  },
  driverHUD: {
    position: 'absolute',
    flex: 0,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    top: '71%',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});