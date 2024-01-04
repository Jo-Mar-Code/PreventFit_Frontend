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

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState(false);
  const [errorConnect, setErrorConnect] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const dispatch = useDispatch();

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const SignUpClick = () => {
    fetch("http://192.168.1.22:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true && EMAIL_REGEX.test(email)) {
          dispatch(login({ username: data.username, token: data.token }));
          navigation.navigate("TabNavigator");
        } else if (
          data.result === false &&
          data.error === "User already exists" &&
          EMAIL_REGEX.test(email)
        ) {
          setErrorUser(true), setErrorMail(false);
        }

        if (!EMAIL_REGEX.test(email)) {
          setErrorMail(true);
        }

        if (
          email === "" ||
          username === "" ||
          password === "" ||
          email === " " ||
          username === " " ||
          password === " "
        ) {
          setErrorConnect(true);
        }
        if (email && username && password) {
          setErrorConnect(false);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titlePage}>Inscription</Text>
      <KeyboardAvoidingView behavior={"position"} style={styles.inputGroup}>
        <TouchableOpacity onPress={() => navigation.navigate("SigninScreen")}>
          <Text style={styles.alreadyConnected}>
            Vous avez déjà un compte ? Connectez-vous ici !
          </Text>
        </TouchableOpacity>
        <View style={styles.inputs}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            onChangeText={(value) => setEmail(value)}
            value={email}
            style={styles.input}
            placeholderTextColor="#000"
          />
          {(errorMail || errorUser) && (
            <Text style={styles.msgCond}>
              {errorMail && <Text>Email invalide</Text>}{" "}
              {errorUser && <Text>Cet utilisateur existe déjà</Text>}
            </Text>
          )}
          <TextInput
            placeholder="Nom d'utilisateur"
            onChangeText={(value) => setUsername(value)}
            value={username}
            style={styles.input}
            placeholderTextColor="#000"
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
            <Text style={styles.msgCond}>Veuillez remplir tous les champs</Text>
          )}
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.buttonSignUp}
        title="S'inscrire"
        onPress={() => SignUpClick()}
      >
        <Text style={styles.btntext}>S'inscrire</Text>
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

  alreadyConnected: {
    color: "#E76F51",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  msgCond: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  buttonSignUp: {
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
  inputs: {
    alignItems: "center",
  },
});
