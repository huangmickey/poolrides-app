import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { Animated } from 'react-native';


jest.useFakeTimers();
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = require('react-native').ScrollView;
    return { KeyboardAwareScrollView };
  });
  Animated.timing = () => ({
    start: () => jest.fn(),
  });
