import { useEffect, useRef } from 'react';
import { Animated, Button, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

const Welcome = ({ navigation }) => {
  const fade = useRef(new Animated.Value(0)).current;

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1500,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={{
          fontSize: isLandscape ? 34 : 42,
          fontWeight: 'bold',
          color: '#1b6b50',
          opacity: fade,
          transform: [
            {
              translateY: fade.interpolate({
                inputRange: [0, 1],
                outputRange: [40, 0],
              }),
            },
          ],
        }}
      >
        Hidden Gems
      </Animated.Text>

      <Text style={styles.tagline}>
        Find the places most people walk straight past.
      </Text>

      <View style={{ width: isLandscape ? '50%' : '80%' }}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />

        <View style={{ height: 12 }} />

        <Button title="Create an Account" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f7f4',
  },

  tagline: {
    fontSize: 16,
    color: '#4a4a4a',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 40,
  },
});
