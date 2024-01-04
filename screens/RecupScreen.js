import { StyleSheet, Text, View, Switch, Modal, Pressable } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Dimensions } from "react-native";
import { useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Video } from "react-native";

export default function RecupScreen({ navigation }) {
  const [isFocus, setIsFocus] = useState(false);
  const [dropDownValue, setDropDownValue] = useState({});
  const [coherenceId, setcoherenceVideo] = useState("");
  const [routine5minId, setroutine5minVideo] = useState("");
  const [routine10minId, setroutine10minVideo] = useState("");
  const [routine20minId, setroutine20minVideo] = useState("");
  const [active, setActivity] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = () => {
    setActivity(!active);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 1500);
    setDropDownValue({});
  };

  useEffect(() => {
    const coherenceCardiaque = "https://www.youtube.com/watch?v=UXgQDMQBTSY";
    const coherenceId = coherenceCardiaque.split(
      "https://www.youtube.com/watch?v="
    )[1];
    setcoherenceVideo(coherenceId);
    const routine5min = "https://www.youtube.com/watch?v=0kdQYrkXXds";
    const routine5minId = routine5min.split(
      "https://www.youtube.com/watch?v="
    )[1];
    setroutine5minVideo(routine5minId);
    const routine10min = "https://www.youtube.com/watch?v=fmFOyxPeGZg";
    const routine10minId = routine10min.split(
      "https://www.youtube.com/watch?v="
    )[1];
    setroutine10minVideo(routine10minId);
    const routine20min = "https://www.youtube.com/watch?v=WjsQc9GUBW0";
    const routine20minId = routine20min.split(
      "https://www.youtube.com/watch?v="
    )[1];
    setroutine20minVideo(routine20minId);
  }, []);

  const inputPeriod = [
    { label: "5 minutes", value: "1" },
    { label: "10 minutes", value: "2" },
    { label: "20 minutes", value: "3" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titlePage}>Récupération</Text>
      <View style={styles.toggleView}>
        <Text style={styles.toggleText}>Jour de repos</Text>
        <Switch
          trackColor={{ false: "#264653", true: "#264653" }}
          thumbColor="#f5dd4b"
          onValueChange={toggleSwitch}
          value={active}
        />
        <Text style={styles.toggleText}>Entraînement/Compétition</Text>
      </View>

      {!active && (
        <View style={styles.reposDiv}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            inputSearchStyle={styles.inputSearchStyle}
            data={inputPeriod}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={
              !isFocus ? "Choisissez la durée de vos étirements" : "..."
            }
            searchPlaceholder="Search..."
            value={dropDownValue.value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            xLabelsOffset={100}
            onChange={(item) => {
              setDropDownValue(item);
              setIsFocus(false);
            }}
          />
          <Text style={styles.reposText}>
            Les étirements sont essentiels pour prévenir les blessures en
            améliorant la flexibilité musculaire et l'amplitude des mouvements.
            En augmentant la souplesse, les muscles sont mieux préparés à
            l'activité physique. En dédiant quelques minutes à cette pratique,
            vous investissez dans la protection à long terme de votre corps,
            renforçant sa résilience et réduisant les risques de blessures.
          </Text>
        </View>
      )}
      {!active && dropDownValue.value === "1" && (
        <View style={styles.video}>
          <YoutubePlayer
            height={300}
            videoId={routine5minId}
            webViewStyle={{ opacity: 1 }}
          />
        </View>
      )}
      {!active && dropDownValue.value === "2" && (
        <View style={styles.video}>
          <YoutubePlayer
            height={300}
            videoId={routine10minId}
            webViewStyle={{ opacity: 1 }}
          />
        </View>
      )}
      {!active && dropDownValue.value === "3" && (
        <View style={styles.video}>
          <YoutubePlayer
            height={300}
            videoId={routine20minId}
            webViewStyle={{ opacity: 1 }}
          />
        </View>
      )}
      {active && (
        <View style={styles.videoCoherence}>
          <YoutubePlayer
            height={300}
            videoId={coherenceId}
            webViewStyle={{ opacity: 1 }}
          />

          <View style={styles.coherenceInstruction}>
            <FontAwesome name="lightbulb-o" size={60} color="#f5dd4b" />
            <Text style={styles.InstructionText}>
              <Text style={styles.intro}> Pour la cohérence cardiaque : </Text>
              {"\n"}
              {"\n"} - Positionnez-vous confortablement.
              {"\n"} - Respectez le rythme 5 secondes d'inspiration par le nez /
              5 secondes d'expiration.
              {"\n"} - Idéalement à reproduire matin, midi et soir
              régulièrement.
            </Text>
          </View>
        </View>
      )}

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {!active ? (
                <Text style={styles.modalText}>Vous êtes en jour de repos</Text>
              ) : (
                <Text style={styles.modalText}>
                  Vous avez prévu de vous entrainer aujourd'hui
                </Text>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FEFAF7",
  },
  titlePage: {
    marginTop: 60,
    fontSize: 28,
    color: "#E76F51",
  },
  toggleView: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
    justifyContent: "space-around",
  },
  toggleText: {
    fontSize: 16,
    color: "#264653",
    marginHorizontal: 20,
  },
  dropdown: {
    marginTop: 10,
    height: 50,
    width: 320,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  inputSearchStyle: {
    display: "none",
  },
  video: {
    marginTop: 40,
    maxHeight: 300,
    width: "100%",
    borderRadius: 10,
    justifyContent: "space-around",
  },
  videoCoherence: {
    marginTop: 150,
    maxHeight: 300,
    width: "100%",
    borderRadius: 10,
    justifyContent: "space-around",
  },
  coherenceInstruction: {
    marginTop: 150,
    height: 200,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  InstructionText: {
    width: "75%",
    fontSize: 16,
    color: "#264653",
    textAlign: "center",
    marginTop: 10,
  },

  intro: {
    fontWeight: "bold",
  },

  reposDiv: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  reposText: {
    width: "90%",
    fontSize: 14,
    color: "#264653",
    textAlign: "justify",
    fontStyle: "italic",
    marginTop: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 35,
    width: "100%",
    height: 100,
    // zIndex:2,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 1,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    width: "100%",
    textAlign: "center",
  },
});
