import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AttendanceTable from "./components/AttendanceTable";

export default function IndexScreen() {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [attendanceTable, setAttendanceTable] = useState<
    { subject: string; held: string; attend: string; percent: string }[] | null
  >(null);

  const handleLogin = async () => {
    if (!roll || !password) {
      Alert.alert("Missing Info", "Please enter roll number and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://studentmaster-backend.onrender.com/student-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roll, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      setStudentName(data.name);
      setCgpa(data.cgpa);
      setAttendanceTable(data.attendanceTable);
      setImageUrl(`https://info.aec.edu.in/AEC/StudentPhotos/${roll}.jpg`);
      setLoggedIn(true);
    } catch (err) {
      Alert.alert(
        "Login Failed",
        typeof err === "object" && err !== null && "message" in err
          ? (err as any).message
          : String(err)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setRoll("");
    setPassword("");
    setImageUrl("");
    setStudentName("");
    setCgpa("");
    setAttendanceTable(null);
    setLoggedIn(false);
  };

  return (
    <>
      <Stack.Screen options={{ title: "AEC Student Portal" }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
          {!loggedIn ? (
            <View style={styles.card}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>ADITYA ENGINEERING COLLEGE</Text>

              <TextInput
                style={styles.input}
                placeholder="Roll Number"
                value={roll}
                onChangeText={setRoll}
                autoCapitalize="characters"
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.details}>
              <View style={styles.headerRow}>
                <Text style={styles.heading}>Welcome, {studentName}</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutTouch}>
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                {imageUrl ? (
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    onError={() => setImageUrl("")}
                  />
                ) : null}

                <View style={{ marginLeft: 20 }}>
                  <Text style={styles.text}>Roll No: {roll}</Text>
                  <Text style={styles.text}>{cgpa}</Text>
                </View>
              </View>

              <Text style={styles.heading}>Attendance</Text>
              <AttendanceTable table={attendanceTable} />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: 180,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#004080",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: "#fff",
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#004080",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#222",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  details: {
    width: "100%",
    alignItems: "flex-start",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  logoutTouch: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "#ff4d4d",
    borderRadius: 6,
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});