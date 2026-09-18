import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getGems } from '../db';
import { gemPhoto } from '../photos';

const SavedGems = ({ navigation }) => {
  const [gems, setGems] = useState([]);

  useEffect(() => {
    const loadSaved = async () => {
      try {
        const rows = await getGems();

        console.log('Gems in SQLite:', rows.length);

        setGems(rows);
      } catch (error) {
        console.log('Saved gems error:', error);
      }
    };

    loadSaved();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.note}>
        These {gems.length} gems are stored on your phone and work with no internet.
      </Text>

      <FlatList
        data={gems}
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
              <Text style={styles.category}>{item.category}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SavedGems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f7f4',
  },

  note: {
    padding: 16,
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

  category: {
    fontSize: 14,
    color: '#4a4a4a',
    marginTop: 4,
  },
});
