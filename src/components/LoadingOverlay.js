import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AppStyles } from '../utils/styles';

function LoadingOverlay({ message }) {

  
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: AppStyles.color.black,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    color: AppStyles.color.white,
  },
});