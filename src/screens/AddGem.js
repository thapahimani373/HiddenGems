import { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions,} from 'react-native';
import { launchCameraAsync } from 'expo-image-picker';
import * as Location from 'expo-location';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config';

const AddGem = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [category, setCategory] = useState('Beach');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [pickedImage, setPickedImage] = useState(null);
  const [message, setMessage] = useState('');

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  useEffect(() => {
    const findMe = async () => {
      try {
        const permission = await Location.requestForegroundPermissionsAsync();

        if (permission.status !== 'granted') {
          setMessage('Location permission denied, so you can type the coordinates yourself.');
          return;
        }

        const position = await Location.getCurrentPositionAsync({});

        setLatitude(String(position.coords.latitude));
        setLongitude(String(position.coords.longitude));
      } catch (error) {
        console.log('Location error:', error);
      }
    };

    findMe();
  }, []);

  const takeImageHandler = async () => {
    try {
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      if (!image.canceled) {
        setPickedImage(image.assets[0].uri);

        console.log('Image taken:', image.assets[0].uri);
      }
    } catch (error) {
      console.log('Camera error:', error);
    }
  };

  const uploadPhoto = async (uri) => {
    try {
      const answer = await fetch(uri);
      const blob = await answer.blob();

      const fileRef = ref(storage, 'gems/' + name + '-' + blob.size + '.jpg');

      await uploadBytes(fileRef, blob);

      const link = await getDownloadURL(fileRef);

      console.log('Photo uploaded:', link);

      return link;
    } catch (error) {
      console.log('Upload error:', error);

      return uri;
    }
  };

  const saveGemHandler = async () => {
    if (name === '' || description === '' || latitude === '' || longitude === '') {
      setMessage('Please fill in the name, description and coordinates.');
      return;
    }

    try {
      let imageUrl = '';

      if (pickedImage) {
        imageUrl = await uploadPhoto(pickedImage);
      }

      await addDoc(collection(db, 'HiddenGems'), {
        name: name,
        description: description,
        category: category,
        latitude: Number(latitude),
        longitude: Number(longitude),
        imageUrl: imageUrl,
      });

      setMessage('');

      navigation.navigate('Explore');
    } catch (error) {
      console.log('Save gem error:', error);

      setMessage('Could not save the gem. Check your internet.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ width: isLandscape ? '70%' : '100%' }}>
        <Text style={styles.label}>Name of the place</Text>

        <TextInput
          style={styles.input}
          placeholder="Piha Blowhole"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Description</Text>

        <TextInput
          style={[styles.input, { height: 90 }]}
          placeholder="What makes it worth the trip?"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />

        <Text style={styles.label}>Category</Text>

        <TextInput style={styles.input} value={category} onChangeText={setCategory} />

        <Text style={styles.label}>Latitude (filled from your location)</Text>

        <TextInput
          style={styles.input}
          value={latitude}
          onChangeText={setLatitude}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Longitude (filled from your location)</Text>

        <TextInput
          style={styles.input}
          value={longitude}
          onChangeText={setLongitude}
          keyboardType="numeric"
        />

        <View style={styles.photoBox}>
          {pickedImage && <Image style={styles.photo} source={{ uri: pickedImage }} />}
        </View>

        <Button title="Take a Photo" onPress={takeImageHandler} />

        <View style={{ height: 12 }} />

        {message !== '' && <Text style={styles.message}>{message}</Text>}

        <Button title="Save Gem" onPress={saveGemHandler} />
      </View>
    </ScrollView>
  );
};

export default AddGem;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f7f4',
  },

  label: {
    fontSize: 15,
    color: '#1b6b50',
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#c8d6cf',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
    marginBottom: 14,
  },

  photoBox: {
    backgroundColor: '#dce7e1',
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 14,
  },

  photo: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },

  message: {
    color: '#b00020',
    marginBottom: 10,
  },
});
