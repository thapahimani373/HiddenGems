import { Button, StyleSheet, Text, View } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config';

const Profile = ({ navigation, route }) => {
  const email = route.params ? route.params.email : '';

  const logoutHandler = async () => {
    try {
      await signOut(auth);

      navigation.navigate('Welcome');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>

      <Text style={styles.email}>{email}</Text>

      <Button title="Log Out" onPress={logoutHandler} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f7f4',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1b6b50',
  },

  email: {
    fontSize: 15,
    color: '#4a4a4a',
    marginTop: 6,
    marginBottom: 30,
  },
});
