import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
//import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import moment from "moment";

export default function FeedbackScreen({ navigation }) {
  const [isThirsty, setIsThirsty] = useState(false);
  const [NightWakeUp, setNightWakeUp] = useState(false);
  const [insomnie, setInsomnie] = useState(false);
  const [morningFatigue, setMorningFatigue] = useState(false);
  const [sliderEnergyValue, setSliderEnergyValue] = useState(0);
  const [sliderSleepValue, setSliderSleepValue] = useState(0);
  const [sliderMotivationValue, setSliderMotivationValue] = useState(0);
  const [sliderPhysicalValue, setSliderPhysicalValue] = useState(0);
  const [musclePain, setMusclePain] = useState(false);
  const [muscleFatigue, setMuscleFatigue] = useState(false);
  const [trainingInjury, setTrainingInjury] = useState(false);
  const [appetiteLack, setAppetiteLack] = useState(false);
  const [bloating, setBloating] = useState(false);
  const [hungryFeel, setHungryFeel] = useState(false);
  const [intestinPain, setIntestinPain] = useState(false);
  const [hydrateQuantity, setHydrateQuantity] = useState("");

  const user = useSelector((state) => state.user.value);
  const currentDate = moment().subtract(1, "days").toDate();

  const sendFeedback = async () => {
    const lastFeedbackDate = await AsyncStorage.getItem("lastFeedbackDate");

    const today = moment().format("YYYY-MM-DD");

    if (lastFeedbackDate === today) {
      alert("Vous avez déjà envoyé un feedback aujourd'hui");
      return;
    }

    

    fetch(`http://192.168.1.22:3000/stats/sendFeedback/${user.token}`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ 
        Date: currentDate,
        Hydratation_quantity: hydrateQuantity,
        isThirsty: isThirsty,
        EnergyValue: sliderEnergyValue,
        SleepValue: sliderSleepValue,
        MotivationValue: sliderMotivationValue,
        PhysicalValue: sliderPhysicalValue,
        NightWakeUp: NightWakeUp,
        insomnie: insomnie,
        morningFatigue: morningFatigue,
        musclePain: musclePain,
        muscleFatigue: muscleFatigue,
        trainingInjury: trainingInjury,
        appetiteLack: appetiteLack,
        bloating: bloating,
        hungryFeel: hungryFeel,
        intestinPain: intestinPain,
      }),
    });
    await AsyncStorage.setItem("lastFeedbackDate", today);
    navigation.navigate("MenuScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titlePage}>Votre Feedback Quotidien</Text>

      <ScrollView>
        <View style={styles.allQuestions}>
          <Text style={styles.titleTheme}>Hydratation</Text>
          <Text style={styles.questionTheme}>
            Confirmez-vous avoir bu cette quantité d'eau la journée précédente ?
          </Text>
          <TextInput
            placeholder="Quantité bue"
            style={styles.input}
            onChangeText={(value) => setHydrateQuantity(value)}
            value={hydrateQuantity}
          ></TextInput>

          <View style={styles.checkboxQuestion}>
            <Text style={styles.questionTheme}>
              Avez-vous eu la sensation de soif lors de la journée précédente ?
            </Text>
            <TouchableOpacity onPress={() => setIsThirsty(!isThirsty)}>
              {isThirsty && (
                <FontAwesome
                  name="check-square"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
              {!isThirsty && (
                <FontAwesome
                  name="square-o"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.titleTheme}>Récupération</Text>
          <Text style={styles.questionTheme}>
            Comment jugez vous votre niveau d’énergie sur le jour précédent ?
          </Text>
          <View style={styles.slider}>
            <Text style={styles.sliderValue}>{sliderEnergyValue}</Text>
            <Slider
              style={{ width: "80%" }}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={sliderEnergyValue}
              onValueChange={(value) => setSliderEnergyValue(value)}
              minimumTrackTintColor="#E76F51"
            />
          </View>

          <Text style={styles.questionTheme}>
            Comment jugez vous votre qualité du sommeil durant la nuit
            précédente ?
          </Text>
          <View style={styles.slider}>
            <Text style={styles.sliderValue}>{sliderSleepValue}</Text>
            <Slider
              style={{ width: "80%" }}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={sliderSleepValue}
              onValueChange={(value) => setSliderSleepValue(value)}
              minimumTrackTintColor="#E76F51"
            />
          </View>

          <View style={styles.checkboxQuestion}>
            <Text style={styles.questionTheme}>
              Cochez les difficultés rencontrés durant votre nuit précédente :
            </Text>
            <TouchableOpacity onPress={() => setNightWakeUp(!NightWakeUp)}>
              {NightWakeUp && (
                <FontAwesome
                  name="check-square"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
              {!NightWakeUp && (
                <FontAwesome
                  name="square-o"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.checkText}>Réveils Nocturnes</Text>
          </View>

          <View style={styles.checkboxQuestion}>
            <TouchableOpacity onPress={() => setInsomnie(!insomnie)}>
              {insomnie && (
                <FontAwesome
                  name="check-square"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
              {!insomnie && (
                <FontAwesome
                  name="square-o"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.checkText}>Insomnies</Text>
          </View>

          <View style={styles.checkboxQuestion}>
            <TouchableOpacity
              onPress={() => setMorningFatigue(!morningFatigue)}
            >
              {morningFatigue && (
                <FontAwesome
                  name="check-square"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
              {!morningFatigue && (
                <FontAwesome
                  name="square-o"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.checkText}>Fatigue matinale</Text>
          </View>

          <Text style={styles.questionTheme}>
            Comment jugez vous votre niveau de motivation à vous entrainer le
            jour précédent ?
          </Text>
          <View style={styles.slider}>
            <Text style={styles.sliderValue}>{sliderMotivationValue}</Text>
            <Slider
              style={{ width: "80%" }}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={sliderMotivationValue}
              onValueChange={(value) => setSliderMotivationValue(value)}
              minimumTrackTintColor="#E76F51"
            />
          </View>

          <Text style={styles.questionTheme}>
            Comment jugez vous votre forme durant votre/vos entraînement(s) lors
            du jour précédent ?
          </Text>
          <View style={styles.slider}>
            <Text style={styles.sliderValue}>{sliderPhysicalValue}</Text>
            <Slider
              style={{ width: "80%" }}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={sliderPhysicalValue}
              onValueChange={(value) => setSliderPhysicalValue(value)}
              minimumTrackTintColor="#E76F51"
            />
          </View>

          <View style={styles.checkboxQuestion}>
            <Text style={styles.questionTheme}>
              Cohez les difficultés rencontrés durant votre/vos précédents
              entrainements précédente :
            </Text>
            <TouchableOpacity
              onPress={() => setTrainingInjury(!trainingInjury)}
            >
              {trainingInjury && (
                <FontAwesome
                  name="check-square"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
              {!trainingInjury && (
                <FontAwesome
                  name="square-o"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.checkText}>Blessure à l'entraînement</Text>
          </View>

          <View style={styles.checkboxQuestion}>
            <TouchableOpacity onPress={() => setMusclePain(!musclePain)}>
              {musclePain && (
                <FontAwesome
                  name="check-square"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
              {!musclePain && (
                <FontAwesome
                  name="square-o"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.checkText}>Douleurs musculaires</Text>
          </View>

          <View style={styles.checkboxQuestion}>
            <TouchableOpacity onPress={() => setMuscleFatigue(!muscleFatigue)}>
              {muscleFatigue && (
                <FontAwesome
                  name="check-square"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
              {!muscleFatigue && (
                <FontAwesome
                  name="square-o"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.checkText}>Fatigue musculaire</Text>
          </View>

          <Text style={styles.titleTheme}>Nutrition</Text>

          <View style={styles.checkboxQuestion}>
            <Text style={styles.questionTheme}>
              Cochez les différentes sensations de la veille sur le plan
              alimentaire :
            </Text>
            <TouchableOpacity onPress={() => setAppetiteLack(!appetiteLack)}>
              {appetiteLack && (
                <FontAwesome
                  name="check-square"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
              {!appetiteLack && (
                <FontAwesome
                  name="square-o"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.checkText}>Manque d'appétit</Text>
          </View>

          <View style={styles.checkboxQuestion}>
            <TouchableOpacity onPress={() => setBloating(!bloating)}>
              {bloating && (
                <FontAwesome
                  name="check-square"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
              {!bloating && (
                <FontAwesome
                  name="square-o"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.checkText}>Ballonnements</Text>
          </View>

          <View style={styles.checkboxQuestion}>
            <TouchableOpacity onPress={() => setHungryFeel(!hungryFeel)}>
              {hungryFeel && (
                <FontAwesome
                  name="check-square"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
              {!hungryFeel && (
                <FontAwesome
                  name="square-o"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.checkText}>Sensation de faim importante</Text>
          </View>

          <View style={styles.checkboxQuestion}>
            <TouchableOpacity onPress={() => setIntestinPain(!intestinPain)}>
              {intestinPain && (
                <FontAwesome
                  name="check-square"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
              {!intestinPain && (
                <FontAwesome
                  name="square-o"
                  size={28}
                  color="#E76F51"
                  style={styles.checkBoxValid}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.checkText}>Douleurs intestinales</Text>
          </View>
        </View>

        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => sendFeedback()}
          >
            <Text style={styles.btnText}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <Button
       title="Retour"
       onPress={() => navigation.navigate('MenuScreen')}
     /> */}
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

  titlePage: {
    marginTop: 60,
    fontSize: 28,
    color: "#E76F51",
  },

  allQuestions: {
    width: "90%",
    marginTop: 50,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  titleTheme: {
    color: "#264653",
    fontSize: 20,
    marginLeft: 20,
  },
  slider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10,
  },

  questionTheme: {
    fontSize: 16,
    color: "black",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  checkboxQuestion: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10,
  },

  checkBoxValid: {
    marginLeft: 20,
  },

  checkText: {
    fontSize: 14,
    color: "black",
    marginLeft: 10,
  },

  input: {
    marginLeft: 20,
    margin: 10,
    width: 275,
    height: 40,
    borderWidth: 1,
    borderColor: "#264653",
    padding: 10,
    borderRadius: 10,
  },

  btn: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  confirmBtn: {
    backgroundColor: "#264653",
    color: "white",
    borderRadius: 30,
    borderWidth: 1,
    padding: 10,
    minWidth: "50%",
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    color: "white",
    //fontSize:20,
    padding: "auto",
  },
});
