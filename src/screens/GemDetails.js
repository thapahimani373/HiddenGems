import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { gemPhoto } from '../photos';

const GemDetails = ({ route }) => {
  const gem = route.params.gem;
  const photo = gemPhoto(gem);

  const fade = useRef(new Animated.Value(0)).current;

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1200,
    }).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {photo ? (
        <Animated.Image
          source={photo}
          style={{
            width: '100%',
            height: isLandscape ? 160 : 220,
            borderRadius: 10,
            opacity: fade,
          }}
        />
      ) : (
        <View style={[styles.noPhoto, { height: isLandscape ? 160 : 220 }]}>
          <Text style={styles.noPhotoText}>No photo yet</Text>
        </View>
      )}

      <Text style={styles.name}>{gem.name}</Text>

      <Text style={styles.category}>{gem.category}</Text>

      <Text style={styles.description}>{gem.description}</Text>

      <Text style={styles.coords}>
        Latitude {gem.latitude}   Longitude {gem.longitude}
      </Text>
    </ScrollView>
  );
};

export default GemDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f2f7f4',
  },

  noPhoto: {
    width: '100%',
    backgroundColor: '#dce7e1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noPhotoText: {
    color: '#4a4a4a',
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1b6b50',
    marginTop: 16,
  },

  category: {
    fontSize: 15,
    color: '#4a4a4a',
    marginTop: 4,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },

  coords: {
    fontSize: 13,
    color: '#4a4a4a',
    marginTop: 20,
  },
});
