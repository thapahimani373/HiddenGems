import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config';
import { getGems } from '../db';
import { gemPhoto } from '../photos';

const distanceInKm = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
};

const NearbyGems = ({ navigation }) => {
  const [nearby, setNearby] = useState([]);
  const [message, setMessage] = useState('Finding you...');

  useEffect(() => {
    const findNearby = async () => {
      try {
        const permission = await Location.requestForegroundPermissionsAsync();

        if (permission.status !== 'granted') {
          setMessage('Location permission was denied.');
          return;
        }

        const position = await Location.getCurrentPositionAsync({});

        const myLat = position.coords.latitude;
        const myLon = position.coords.longitude;

        // Get the gems from the internet, or from the phone if there is none
        let gems = [];

        try {
          const mydata = await getDocs(collection(db, 'HiddenGems'));

          gems = mydata.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
          console.log('Nearby fetch error:', error);

          gems = await getGems();
        }


        const withDistance = [];

        for (let i = 0; i < gems.length; i++) {
          const gem = gems[i];

          const km = distanceInKm(myLat, myLon, gem.latitude, gem.longitude);

          if (km <= 50) {
            withDistance.push({ ...gem, km: km });
          }
        }

        withDistance.sort((a, b) => a.km - b.km);

        setNearby(withDistance);

        if (withDistance.length === 0) {
          setMessage('No gems within 50 km of you yet.');
        } else {
          setMessage('');
        }
      } catch (error) {
        console.log('Nearby error:', error);

        setMessage('Could not get your location.');
      }
    };

    findNearby();
  }, []);

  return (
    <View style={styles.container}>
      {message !== '' && <Text style={styles.message}>{message}</Text>}

      <FlatList
        data={nearby}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('GemDetails', { gem: item })}
          >
            {gemPhoto(item) ? (
              <Image source={gemPhoto(item)} style={styles.thumb} />
            ) : (
              <View style={[styles.thumb, styles.noPhoto]}>
                <Text style={styles.noPhotoText}>No photo</Text>
              </View>
            )}

            <View style={styles.itemText}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.distance}>{item.km.toFixed(1)} km away</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NearbyGems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f7f4',
  },

  message: {
    padding: 20,
    textAlign: 'center',
    color: '#4a4a4a',
  },

  item: {
    backgroundColor: 'white',
    marginVertical: 6,
    marginHorizontal: 12,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dce7e1',
    flexDirection: 'row',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  thumb: {
    width: 68,
    height: 68,
    borderRadius: 8,
  },

  noPhoto: {
    backgroundColor: '#dce7e1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  noPhotoText: {
    fontSize: 11,
    color: '#4a4a4a',
  },

  itemText: {
    flex: 1,
    marginLeft: 12,
  },


  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b6b50',
  },

  distance: {
    fontSize: 14,
    color: '#4a4a4a',
    marginTop: 4,
  },
});
