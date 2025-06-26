// app/LoginScreen.js
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
export default function LoginScreen() {
  const [roll, setRoll] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  let loggingIn = false;
  roll = '23A91A6119';
  password = 'Sriram@78747';
  const handleLogin = async () => {
    if (!roll || !password) {
      return Alert.alert('Error', 'Please enter both roll number and password');
    }

    try {
      loggingIn = true;
      // const response = await fetch('http://10.0.0.187:3000/student-data', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ "roll": roll,"password": password }),
      // });
      try{
      const dog =await fetch('https://dog.ceo/api/breeds/image/random');
      } catch (error) {
       Alert.alert('Error fetching dog image');  
      }
      const data = await response.json();
loggingIn = false;
      if (!response.ok) {
        console.log(data);
        return Alert.alert('Login Failed', data?.error || 'Invalid credentials');
      }

      router.push({
        pathname: '/loggedin',
        params: {
          name: data.name,
          rollNo: data.rollNo,
          cgpa: data.cgpa,
          attendanceTableHtml: data.attendanceTableHtml,
        },
      });

    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Failed to connect to the server');
    }
    finally {
      loggingIn = false;
    }
  };

  return (
    <View style={styles.container}>
      <Image source={dog.message} style={{ width: 200, height: 200, marginBottom: 20 }} />
      <Text style={styles.title}>AEC Student Login</Text>
      <TextInput
        placeholder="Roll Number"
        value={roll}
        onChangeText={setRoll}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5,
  },
});
