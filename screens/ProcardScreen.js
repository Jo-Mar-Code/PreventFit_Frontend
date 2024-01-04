import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from "react-native";

export default function ProcardScreen({ navigation, route }) {
  const backClick = () => {
    console.log("Click");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titlepage}> Profil du professionel </Text>

      <View style={styles.Btn}>
        <TouchableOpacity
          style={styles.buttonBack}
          title="Retour"
          onPress={() => backClick()}
        >
          <Text style={styles.btntext}>Retour</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <Text style={styles.textName}>{route.params.Name}</Text>

        <Image
          style={{
            marginTop: 20,
            height: 300,
            width: 250,
            borderRadius: 50,
          }}
          source={{ uri: route.params.Image }}
        />

        <Text style={styles.textDescription}>{route.params.Description}</Text>
        <TouchableOpacity
          style={styles.buttonRdv}
          title="Retour"
          onPress={() => {
            // Ouvrir le lien dans un navigateur externe
            Linking.openURL(route.params.Doctolink);
            console.log(route.params.DoctoLink);
          }}
        >
          <Text style={styles.btntext}>Contact</Text>
          {/* <Link>  {route.params.DoctoLink} </Link> */}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FEFAF7",
  },
  titlepage: {
    marginTop: 75,
    fontSize: 28,
    color: "#E76F51",
    marginBottom: 25,
    // marginLeft: 70,
  },
  Btn: {
    width: " 100%",
  },
  buttonBack: {
    backgroundColor: "#264653",
    color: "white",
    borderRadius: 30,
    borderWidth: 1,
    padding: 10,
    //marginTop:10,
    width: 100,
    minHeight: 40,
    marginLeft: 25,
    marginBottom: 25,
    // alignItems:'center',
    // justifyContent:'center',
  },
  btntext: {
    color: "white",
    //fontSize:20,
    // padding:'auto',
    textAlign: "center",
  },
  textName: {
    fontSize: 20,
    color: "#E76F51",
    // marginBottom: 30,
    //   marginLeft:105,
  },
  textDescription: {
    fontSize: 16,
    margin: 30,
    color: "#264653",
  },
  card: {
    // flexDirection: 'column',
  },

  buttonRdv: {
    backgroundColor: "#264653",
    color: "white",
    borderRadius: 30,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    minWidth: "50%",
    minHeight: 40,
    // marginLeft: 150,

    marginBottom: 25,
    // alignItems:'center',
    // justifyContent:'center',
  },

  containerScroll: {
    // flexShrink: 1,

    // justifyContent: 'center',
    minHeight: 200,
    width: "100%",
    //  backgroundColor: 'red',
    //  width: '90%',
    alignItems: "center",
  },
});
