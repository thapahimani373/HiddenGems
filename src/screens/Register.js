import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const registerHandler = async () => {
    if (name === '' || email === '' || password === '') {
      setMessage('Please fill in every field.');
      return;
    }

    if (password.length < 6) {
      setMessage('Password needs at least 6 characters.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      setMessage('');

      navigation.navigate('Home', { email: email });
    } catch (error) {
      console.log('Register error:', error);

      setMessage('Could not create the account. That email may already be used.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: isLandscape ? '60%' : '90%' }}>
        <Text style={styles.label}>Full name</Text>

        <TextInput
          style={styles.input}
          placeholder="Your name"
          value={name}
          onChangeText={setName}
          autoComplete="name"
          textContentType="name"
          importantForAutofill="yes"
        />

        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          importantForAutofill="yes"
        />

        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="At least 6 characters"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          autoComplete="new-password"
          textContentType="newPassword"
          importantForAutofill="yes"
        />

        {message !== '' && <Text style={styles.message}>{message}</Text>}

        <Button title="Create Account" onPress={registerHandler} />
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    marginBottom: 16,
  },

  message: {
    color: '#b00020',
    marginBottom: 10,
  },
});
