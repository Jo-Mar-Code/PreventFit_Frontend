import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

export default function SigninScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorConnect, setErrorConnect] = useState(false);
  const dispatch = useDispatch();

  const SignInClick = ()=>{
    fetch('http://192.168.1.22:3000/users/signin', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email: email,  password: password })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          dispatch(login({ username: data.username, token: data.token }));
          navigation.navigate("TabNavigator");
        } else if (data.result === false) {
          setErrorConnect(true);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titlePage}>Connexion</Text>
      <KeyboardAvoidingView behavior={"position"} style={styles.inputGroup}>
        <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
          <Text style={styles.notAccountYet}>
            Pas encore de compte ? Inscrivez-vous !
          </Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
          value={email}
          style={styles.input}
          placeholderTextColor="#000"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
        />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          value={password}
          style={styles.input}
          placeholderTextColor="#000"
        />
        {errorConnect && (
          <Text style={{ color: "red" }}>Email ou Mot de passe incorrect</Text>
        )}
      </KeyboardAvoidingView>

      <TouchableOpacity
        style={styles.buttonSignIn}
        title="Se connecter"
        onPress={() => SignInClick()}
      >
        <Text style={styles.btntext}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FEFAF7",
  },

  input: {
    margin: 10,
    width: 275,
    height: 40,
    borderWidth: 1,
    borderColor: "#264653",
    padding: 10,
    borderRadius: 10,
  },

  notAccountYet: {
    color: "#E76F51",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  buttonSignIn: {
    backgroundColor: "#264653",
    color: "white",
    borderRadius: 30,
    borderWidth: 1,
    padding: 10,
    marginBottom: 50,
    minWidth: "50%",
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  inputGroup: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  btntext: {
    color: "white",
    fontSize: 20,
    padding: "auto",
  },
  titlePage: {
    marginTop: 75,
    fontSize: 28,
    color: "#E76F51",
  },
});
