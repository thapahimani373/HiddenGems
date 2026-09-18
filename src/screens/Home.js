import { Button, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

const Home = ({ navigation, route }) => {
  const email = route.params ? route.params.email : '';

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Welcome back</Text>

      <Text style={styles.email}>{email}</Text>

      <View style={{ width: isLandscape ? '60%' : '90%' }}>
        <View style={styles.gap}>
          <Button title="Explore Hidden Gems" onPress={() => navigation.navigate('Explore')} />
        </View>

        <View style={styles.gap}>
          <Button title="Gems Near Me" onPress={() => navigation.navigate('NearbyGems')} />
        </View>

        <View style={styles.gap}>
          <Button title="Add a New Gem" onPress={() => navigation.navigate('AddGem')} />
        </View>

        <View style={styles.gap}>
          <Button title="Saved Offline" onPress={() => navigation.navigate('SavedGems')} />
        </View>

        <View style={styles.gap}>
          <Button title="My Profile" onPress={() => navigation.navigate('Profile', { email })} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f7f4',
  },

  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1b6b50',
  },

  email: {
    fontSize: 15,
    color: '#4a4a4a',
    marginTop: 4,
    marginBottom: 30,
  },

  gap: {
    marginBottom: 12,
  },
});
