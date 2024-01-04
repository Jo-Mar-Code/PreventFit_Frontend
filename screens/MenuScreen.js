import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";

import { useFonts } from "expo-font";
import { useSelector } from "react-redux";

export default function MenuScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  let [fontsLoaded] = useFonts({
    Ysabeau: require("../assets/fonts/YsabeauSC-Regular.ttf"),
    Ysabold: require("../assets/fonts/YsabeauSC-Bold.ttf"),
    Fuzzy: require("../assets/fonts/FuzzyBubbles-Regular.ttf"),
    FuzzyB: require("../assets/fonts/FuzzyBubbles-Bold.ttf"),
    PermanentMarker: require("../assets/fonts/PermanentMarker-Regular.ttf"),
    Amatic: require("../assets/fonts/AmaticSC-Regular.ttf"),
    AmaticB: require("../assets/fonts/AmaticSC-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.welcome1}>BIENVENUE</Text>
      <Text style={styles.welcome2}>{user.username}</Text>

      <View style={styles.logo}>
        <FontAwesome5 name="running" size={65} color="#ffffff" />
        <Text style={styles.logoText}>Prevent Fit</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FeedbackScreen")}
          style={styles.links}
          title="Feedback"
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.button,
              {
                backgroundColor: "#2A9D8F",
                borderTopLeftRadius: 5,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 5,
              },
            ]}
          >
            <Text>
              <FontAwesome
                name="calendar-check-o"
                size={50}
                color={"#ffffff"}
              />
            </Text>
            <Text style={styles.linktext}>FEEDBACK</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SuiviScreen")}
          title="Suivi"
          style={styles.links}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.button,
              {
                backgroundColor: "#E9C46A",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 20,
              },
            ]}
          >
            <Text>
              <FontAwesome name="bar-chart" size={50} color={"#ffffff"} />
            </Text>
            <Text style={styles.linktext}>MON SUIVI</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ProlistScreen")}
          title="Professionnels de santé"
          style={styles.links}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.button,
              {
                backgroundColor: "#F4A261",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 20,
              },
            ]}
          >
            <Text>
              <FontAwesome5
                name="file-medical-alt"
                size={50}
                color={"#ffffff"}
              />
            </Text>
            <Text style={styles.linktext}>PROFESSIONNELS DE SANTE</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ParamsScreen")}
          title="Paramètres"
          style={styles.links}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.button,
              {
                backgroundColor: "#E76F51",
                borderTopLeftRadius: 5,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 5,
              },
            ]}
          >
            <Text>
              <FontAwesome name="gear" size={50} color={"#ffffff"} />
            </Text>
            <Text style={styles.linktext}>PARAMETRES</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAF7",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  links: {
    width: "40%",
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  button: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  linktext: {
    fontSize: 14,
    textAlign: "center",
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    fontFamily: "Ysabold",
  },
  welcome1: {
    marginTop: 30,
    fontFamily: "Ysabold",
    fontSize: 30,
    marginBottom: 10,
  },
  welcome2: {
    fontFamily: "PermanentMarker",
    fontSize: 30,
    marginBottom: 10,
  },
  logo: {
    height: 180,
    width: 180,
    borderRadius: 90,
    backgroundColor: "#264653",
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#ffffff",
    fontSize: 28,
    fontFamily: "Ysabeau",
  },
});
