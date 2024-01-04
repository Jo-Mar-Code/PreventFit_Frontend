import { TouchableOpacity, StyleSheet, Text, Image, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Animated, {
  useAnimatedSensor,
  SensorType,
  useDerivedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function HomeScreen({ navigation }) {
  const rotation = useAnimatedSensor(SensorType.ROTATION, {
    interval: 20,
  });

  const logoStyle1 = useAnimatedStyle(() => {
    const { pitch, roll, yaw } = rotation.sensor.value;
    return {
      transform: [{ translateX: roll * 40 }, { translateY: pitch * 40 }],
    };
  });
  const logoStyle2 = useAnimatedStyle(() => {
    const { pitch, roll, yaw } = rotation.sensor.value;
    return {
      transform: [{ translateX: roll * 20 }, { translateY: pitch * 20 }],
    };
  });
  const logoStyle3 = useAnimatedStyle(() => {
    const { pitch, roll, yaw } = rotation.sensor.value;
    return {
      transform: [{ translateX: roll * 10 }, { translateY: pitch * 10 }],
    };
  });

  useDerivedValue(() => {
    const { pitch, roll, yaw } = rotation.sensor.value;
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logo, logoStyle3]}>
        <Animated.View style={logoStyle2}>
          <FontAwesome5 name="running" size={65} color="#ffffff" />
        </Animated.View>
        <Animated.View style={logoStyle1}>
          <Text style={styles.logoText}>Prevent Fit</Text>
        </Animated.View>
      </Animated.View>

      <TouchableOpacity
        style={styles.buttonSignIn}
        title="Sign In"
        onPress={() => navigation.navigate("SigninScreen")}
      >
        <Text style={styles.btntext}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSignUp}
        title="Sign Up"
        onPress={() => navigation.navigate("SignupScreen")}
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
    justifyContent: "center",
    backgroundColor: "#FEFAF7",
  },
  buttonSignIn: {
    backgroundColor: "#E76F51",
    color: "white",
    borderRadius: 30,
    padding: 10,
    marginBottom: 30,
    borderWidth: 1,
    minWidth: "50%",
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },

  buttonSignUp: {
    backgroundColor: "#F4A261",
    color: "white",
    borderRadius: 30,
    padding: 10,
    borderWidth: 1,
    minWidth: "50%",
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  btntext: {
    color: "white",
    fontSize: 20,
    padding: "auto",
  },
  image: {
    width: 230,
    height: 220,
    marginBottom: 100,
  },
  logoText: {
    color: "#ffffff",
    fontSize: 28,
  },
  logo: {
    height: 250,
    width: 250,
    borderRadius: 125,
    backgroundColor: "#264653",
    marginBottom: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
