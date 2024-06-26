import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { FIREBASE_GET_AUTH, FIRESTORE_DB } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import styles from "./styles";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarBackgroundColor, setSnackbarBackgroundColor] = useState("red");
  const auth = FIREBASE_GET_AUTH;
  const db = FIRESTORE_DB;

  const handleEmailChange = text => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validate email and set error state
    setEmailError(!emailRegex.test(text));
  };

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setSnackbarMessage("Please enter email and password");
      setSnackbarBackgroundColor("red");
      setSnackbarVisible(true);
      return;
    }
    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Fetch user document from the `nannies` collection
      const nannyDocRef = doc(db, "nannies", userId);
      const nannyDocSnapshot = await getDoc(nannyDocRef);

      if (nannyDocSnapshot.exists()) {
        // User is a nanny
        setSnackbarMessage("Login successful");
        setSnackbarBackgroundColor("green");
        setSnackbarVisible(true);
        setEmail("");
        setPassword("");
        navigation.navigate("Visitor", { screen: "Visitor Home Page" });
      } else {
        // Fetch user document from the `parents` collection
        const parentDocRef = doc(db, "parents", userId);
        const parentDocSnapshot = await getDoc(parentDocRef);

        if (parentDocSnapshot.exists()) {
          // User is a parent
          setSnackbarMessage("Login successful");
          setSnackbarBackgroundColor("green");
          setSnackbarVisible(true);
          setEmail("");
          setPassword("");
          navigation.navigate("User", { screen: "User Home Page" });
        } else {
          throw new Error("User document not found in either nannies or parents collection");
        }
      }
    } catch (error) {
      setSnackbarMessage("Login failed! Please check your credentials");
      setSnackbarBackgroundColor("red");
      setSnackbarVisible(true);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("AuthScreen", { screen: "Reset Password Page" });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/icons/logo-version-mauve.png")} style={styles.image} />
      <View style={styles.subContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome back !</Text>
          <Text style={styles.subtitle}>Login to your account</Text>
          <View style={{ position: "absolute", top: 110 }}>
            <TextInput
              label="Email"
              placeholder="Enter your email address"
              mode="outlined"
              left={<TextInput.Icon icon="email" color="#BDBDBD" />}
              style={styles.input}
              outlineColor="#BDBDBD"
              value={email}
              error={emailError}
              onChangeText={handleEmailChange}
            />
            {emailError && <Text style={styles.errorText}>Please enter a valid email address</Text>}
            <TextInput
              secureTextEntry={secureTextEntry}
              label="Password"
              placeholder="Enter your password"
              mode="outlined"
              left={<TextInput.Icon icon="lock" color="#BDBDBD" />}
              outlineColor="#BDBDBD"
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? "eye-off" : "eye"}
                  color="#BDBDBD"
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                    return false;
                  }}
                />
              }
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <Button
          mode="contained-tonal"
          style={styles.signinButton}
          onPress={handleLogin}
          buttonColor="#FCD9E0"
          textColor="#FA89B8"
        >
          <Text style={styles.signinButtonText}>Login</Text>
        </Button>
      </View>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate("AuthScreen", { screen: "Signup Page" })}
      >
        <Text style={styles.otherOptionsText}>Don't have a account? Sign up</Text>
      </TouchableOpacity>
      <Text
        style={[
          styles.otherOptionsText,
          { bottom: 190, color: "#fff", textDecorationLine: "underline" },
        ]}
      >
        Or
      </Text>
      <TouchableOpacity
        style={styles.visitorButton}
        onPress={() => navigation.navigate("Visitor", { screen: "Visitor Home Page" })}
      >
        <Text style={styles.otherOptionsText}>
          Don't want to create an account? Go as a visitor
        </Text>
      </TouchableOpacity>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
        style={{ backgroundColor: snackbarBackgroundColor }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

export default SigninScreen;
