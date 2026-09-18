import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const loginHandler = async () => {
    if (email === '' || password === '') {
      setMessage('Please fill in both fields.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setMessage('');

      navigation.navigate('Home', { email: email });
    } catch (error) {
      console.log('Login error:', error);

      setMessage('Could not log in. Check your email and password.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: isLandscape ? '60%' : '90%' }}>
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
          placeholder="Your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          autoComplete="password"
          textContentType="password"
          importantForAutofill="yes"
        />

        {message !== '' && <Text style={styles.message}>{message}</Text>}

        <Button title="Login" onPress={loginHandler} />

        <View style={{ height: 12 }} />

        <Button
          title="No account yet? Register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
};

export default Login;

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
