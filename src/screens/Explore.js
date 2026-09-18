import { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config';
import { saveGems, getGems } from '../db';
import { gemPhoto } from '../photos';

const ITEM_HEIGHT = 100;

const Explore = ({ navigation }) => {
  const [gems, setGems] = useState([]);
  const [offline, setOffline] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try the internet first
        const mydata = await getDocs(collection(db, 'HiddenGems'));

        const data = mydata.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setGems(data);
        setOffline(false);

        // Keep a copy on the phone for later
        await saveGems(data);
      } catch (error) {
        console.log('Explore error:', error);

        // No internet, so read what we saved last time
        const saved = await getGems();

        setGems(saved);
        setOffline(true);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.item, { transform: [{ scale }], opacity }]}>
        <TouchableOpacity
          style={styles.row}
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
            <Text style={styles.category}>{item.category}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {offline && <Text style={styles.banner}>Offline. Showing gems saved on your phone.</Text>}

      {gems.length === 0 && <Text style={styles.empty}>No gems yet.</Text>}

      <Animated.FlatList
        data={gems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f7f4',
  },

  banner: {
    backgroundColor: '#ffe08a',
    color: '#5a4300',
    padding: 8,
    textAlign: 'center',
  },

  empty: {
    padding: 20,
    textAlign: 'center',
    color: '#4a4a4a',
  },

  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    backgroundColor: 'white',
    marginVertical: 6,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dce7e1',
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

  category: {
    fontSize: 14,
    color: '#4a4a4a',
    marginTop: 4,
  },
});
