import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";
import { Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import haversine from "haversine";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

import Pro from "../components/pro";

export default function ProlistScreen({ navigation }) {
  // const Profession = ['Tout', 'Osthéopathe', 'Kinésithérapeute', 'Médecin du sport ', 'Diététicien']
  //const handleValueChange=(itemValue, itemIndex) =>setProfesion(itemValue)
  const [city, setCity] = useState("");
  const [profession, setProfesion] = useState([]);
  const [selectedProf, setSelectedProf] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [dropDownValue, setDropDownValue] = useState({});
  const [isFocus, setIsFocus] = useState(false);
  const [search, setSearch] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState({});
  const [currentPosition, setCurrentPosition] = useState(null);
  const [nextPro, setNextPro] = useState([]);
  useEffect(() => {
    if (isEnabled) {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
            setCurrentPosition(location.coords);
            console.log(location.coords);
          });
        }
      })();
      console.log("map");
    } else {
      console.log("liste");
    }
  }, [isEnabled]);

  //  useEffect(() => {
  //   // ...

  //   const filteredDoctors = doctors.filter(doctor => {
  //     console.log(filteredDoctors)
  //     // Vérifiez si la position actuelle est disponible
  //     if (currentPosition) {
  //       // Coordonnées du professionnel de santé
  //       const doctorCoords = { latitude: doctor.Latitude, longitude: doctor.Longitude };

  //       // Calcul de la distance entre la position actuelle et le professionnel de santé en kilomètres
  //       const distance = haversine(currentPosition, doctorCoords, { unit: 'km' });
  //         console.log(distance)
  //       // Filtrer les professionnels de santé à moins de 3 km
  //       return distance <= 3;
  //     }

  //     return false; // Retourne false si la position actuelle n'est pas disponible
  //   });

  //   setNextPro(filteredDoctors);

  //   // ...
  // }, [currentPosition, dropDownValue, search]);

  useEffect(() => {
    // const handleCityPro = () => {
    if (dropDownValue.label && city === "") {
      console.log("only prof ->", dropDownValue.label);
      fetch(`http://192.168.1.22:3000/prof/byProfession/${dropDownValue.label}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setDoctors(data.data); // Mettez à jour l'état des médecins avec les données récupérées
            // console.log(data.data)
          } else {
            setDoctors([]); // Aucun médecin trouvé, réinitialisez la liste
          }
        });
    } else if (!dropDownValue.label && city !== "") {
      console.log("only city ->", city);

      const trimmedCity = city.trim();
      const formattedCity =
        trimmedCity.charAt(0).toUpperCase() +
        trimmedCity.slice(1).toLowerCase();
      fetch(`http://192.168.1.22:3000/prof/byCity/${formattedCity}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setDoctors(data.data); // Mettez à jour l'état des médecins avec les données récupérées
          } else {
            setDoctors([]); // Aucun médecin trouvé, réinitialisez la liste
          }
        });
    } else if (dropDownValue.label && city !== "") {
      console.log("Both ->", dropDownValue.label, city);

      const trimmedCity = city.trim();
      const formattedCity =
        trimmedCity.charAt(0).toUpperCase() +
        trimmedCity.slice(1).toLowerCase();
      fetch(
        `http://192.168.1.22:3000/prof/byCityOrPro/${formattedCity}/${dropDownValue.label}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data) {
            setDoctors(data.data); // Mettez à jour l'état des médecins avec les données récupérées
          } else {
            setDoctors([]); // Aucun médecin trouvé, réinitialisez la liste
          }
        });
    }
  }, [dropDownValue, search]);

  useEffect(() => {
    fetch(`http://192.168.1.22:3000/prof`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          // console.log(data)
          const uniqueLabels = []; // Pour stocker les labels déjà rencontrés
          const formattedProfession = data.data
            .map((item) => {
              if (!uniqueLabels.includes(item.Profession)) {
                uniqueLabels.push(item.Profession); // Ajouter le label actuel à la liste
                return {
                  label: item.Profession,
                  value: item.Profession,
                };
              }
              return null; // Retourner null pour les éléments dupliqués
            })
            .filter((item) => item !== null); // Filtrer les éléments null générés par les doublons
          setProfesion(formattedProfession);
        }
      });
  }, []);

  const handlePressMarker = (proInfo) => {
    const { handlePressMarker, ...infoWithoutHandler } = proInfo;
    console.log(proInfo);
    setSelectedMarkerInfo(proInfo);
    setModalVisible(true);
  };

  const handlePressProCard = (proInfo) => {
    // console.log(proInfo.handlePressProCard)
    const { handlePressProCard, ...infoWithoutHandler } = proInfo;
    console.log(infoWithoutHandler);
    // console.log(delete proInfo.handlePressProCard)
    navigation.navigate("ProcardScreen", infoWithoutHandler);
  };

  // const handleLongPress = (e) => {

  //   setModalVisible(true);
  // };

  const markers = doctors.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{ latitude: data.Latitude, longitude: data.Longitude }}
        onPress={() => handlePressMarker(data)}
      />
    );
  });

  const handlePressProfil = (proInfo) => {
    // console.log(proInfo.handlePressProCard)
    const { handlePressProfil, ...infoWithoutHandler } = proInfo;
    // console.log(infoWithoutHandler)
    // console.log(delete proInfo.handlePressProCard)
    setModalVisible(false);
    navigation.navigate("ProcardScreen", infoWithoutHandler);
  };

  const Doctors = doctors.map((data, i) => {
    // console.log(doctors)
    return <Pro key={i} {...data} handlePressProCard={handlePressProCard} />;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titlepage}>Professionels de santé </Text>
      <View style={styles.containerSwitch}>
        <Switch
          trackColor={{ false: "#767577", true: "#264653" }}
          // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        {isEnabled && (
          <Text style={{ color: "#E76F51", marginTop: 5 }}>
            Mode map activé
          </Text>
        )}
        {!isEnabled && (
          <Text style={{ color: "#E76F51", marginTop: 5 }}>
            Mode Liste activé
          </Text>
        )}
      </View>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={profession}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Spécialisation" : "..."}
        searchPlaceholder="Search..."
        value={dropDownValue.value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setDropDownValue(item);
          setIsFocus(false);
          // handleCityPro()
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ville"
          onChangeText={(value) => setCity(value)}
          value={city}
          style={styles.input}
          placeholderTextColor="#000"
        />
        <FontAwesome
          name="search"
          size={20}
          color="#CCCCCC"
          style={styles.searchIcon}
          onPress={() => setSearch(!search)}
        />
      </View>
      {isEnabled ? (
        // Affiche la MapView si le bouton switch est activé

        <View>
          <MapView
            initialRegion={{
              latitude: 42, // Latitude approximative du centre de la France
              longitude: 1.8883, // Longitude approximative du centre de la France
              latitudeDelta: 30, // Ajustez cette valeur pour définir la distance verticale visible
              longitudeDelta: 30,
            }}
            style={styles.map}
          >
            {currentPosition && (
              <Marker
                coordinate={currentPosition}
                title="Ma position"
                pinColor="#fecb2d"
              />
            )}
            {markers}
          </MapView>
          {selectedMarkerIndex !== null && (
            <Modal visible={modalVisible} animationType="fade" transparent>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {/* Contenu de la modal */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.textButton}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
          <Modal visible={modalVisible} animationType="fade" transparent>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <FontAwesome
                  name="window-close"
                  size={25}
                  color={"#ec6e5b"}
                  style={{ position: "absolute", top: 15, right: 20 }}
                  onPress={() => setModalVisible(false)}
                />
                <Text style={styles.name}> {selectedMarkerInfo.Name} </Text>
                <Text> {selectedMarkerInfo.Profession} </Text>
                <Image
                  style={{
                    height: "50%",
                    width: "40%",
                    borderRadius: 50,
                    marginTop: 10,
                  }}
                  source={{ uri: selectedMarkerInfo.Image }}
                />
                {/* <TextInput placeholder="New place" style={styles.input} /> */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handlePressProfil(selectedMarkerInfo)}
                >
                  <Text style={styles.textButton}>Profil</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <View>
          {doctors.length > 0 ? (
            <ScrollView contentContainerStyle={styles.cardcontainer}>
              {Doctors}
            </ScrollView>
          ) : (
            <Text style={{ margin: 30, color: "#E76F51", fontSize: 16 }}>
              Nous ne trouvons pas de professionnels dans cette ville.
            </Text>
          )}
        </View>
      )}
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
  },
  // picker: {
  //   width: 350,
  //   height: 40,
  //   // borderColor: 'gray',
  //   // borderWidth: 1,
  //   // borderRadius: 10,
  //   padding: 10,
  //   marginBottom: 80,

  // },

  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 320,
    height: 40,
    marginTop: 30,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 10,
    marginBottom: 30,
  },
  searchIcon: {
    marginHorizontal: 100,
  },
  name: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },

  profession: {
    color: "white",
    textAlign: "center",
  },
  input: {
    marginLeft: 20,
    marginRight: -120,
    width: 280,
  },
  containerSwitch: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  dropdown: {
    height: 50,
    width: 300,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  modalView: {
    marginTop: 450,
    marginLeft: 40,
    marginRight: 40,
    width: 300,
    height: 250,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // input: {
  //   // width: 150,
  //   // borderBottomColor: '#ec6e5b',
  //   // borderBottomWidth: 1,
  //   // fontSize: 16,
  // },
  button: {
    width: 150,
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "#ec6e5b",
    borderRadius: 30,
  },
  textButton: {
    color: "#ffffff",
    height: 24,
    fontWeight: "600",
    fontSize: 15,
  },
  name: {
    marginBottom: 10,
  },
  cardcontainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    height: 1100,
    width: "100%",
    // backgroundColor: 'red',
  },
});

// const data = [
//   { label: 'Item 1', value: '1' },
//   { label: 'Item 2', value: '2' },
//   { label: 'Item 3', value: '3' },
//   { label: 'Item 4', value: '4' },
//   { label: 'Item 5', value: '5' },
//   { label: 'Item 6', value: '6' },
//   { label: 'Item 7', value: '7' },
//   { label: 'Item 8', value: '8' },
// ];
// const handlePro = (pro) => {
//   fetch(`http://10.1.3.33:3000/prof/byProfession/${pro}`)
//     .then(response => response.json())
//     .then(data => {
//       if (data) {
//         setDoctors(data.data);// Mettez à jour l'état des médecins avec les données récupérées
//         // console.log(data.data)
//         setCity('');
//       } else {
//         setDoctors([]); // Aucun médecin trouvé, réinitialisez la liste
//       }
//     })
// }

// const handleNewPlace = () => {
//   const trimmedCity = city.trim()
//   const formattedCity = trimmedCity.charAt(0).toUpperCase() + trimmedCity.slice(1).toLowerCase();
//   fetch(`http://10.1.3.33:3000/prof/byCity/${formattedCity}`)
//     .then(response => response.json())
//     .then(data => {
//       // console.log(data)
//       if (data) {
//         setDoctors(data.data);// Mettez à jour l'état des médecins avec les données récupérées
//         // console.log(data.data)
//         setCity('');
//       } else {
//         setDoctors([]); // Aucun médecin trouvé, réinitialisez la liste
//       }
//     })
// }
