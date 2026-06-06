import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  View
} from 'react-native';

import { router } from 'expo-router';

const spinValue = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    })
  ).start();
}, []);

useEffect(() => {
  const timer = setTimeout(() => {
    router.replace('/ciper');
  }, 3000);

  return () => clearTimeout(timer);
}, []);

const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
});

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logoIcon}
        resizeMode="contain"
      />

      <Image
        source={require('../../assets/images/cyber.png')}
        style={styles.logoText}
        resizeMode="contain"
      />

      <Animated.Image
        source={require('../../assets/images/loading.png')}
        style={[
          styles.loading,
          { transform: [{ rotate: spin }] }
        ]}
        resizeMode="contain"
      />

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  logoIcon: {
    width: 140,
    height: 140,
    marginBottom: 5,
  },

  logoText: {
    width: 280,
    height: 80,
    marginBottom: 25,
  },

  subtitle: {
    color: '#E2E8F0',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 35,
  },

  loading: {
    width: 70,
    height: 70,
    marginTop: 20,
  },

  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 12,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});