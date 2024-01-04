import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import {
  Svg,
  Defs,
  LinearGradient,
  Rect,
  Path,
  Circle,
  Polyline,
  Ellipse,
  Line,
} from "react-native-svg";
import Slider from "@react-native-community/slider";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { hydrate } from "../reducers/user";

export default function HydrateScreen({ navigation }) {
  const dispatch = useDispatch();
  const date1 = new Date().toString();
  const date2 = date1.substring(4, 15);

  //const dayDate = useSelector((state) => state.hydrate.dayDate);
  // const hydrObj = useSelector((state) => state.hydrate.objQuantity);
  // const hydrQuantity = useSelector((state) => state.hydrate.quantity);

  const [sliderHydrateValue, setSliderHydrateValue] = useState(0);

  const [blueBar, setBlueBar] = useState(160);

  const [hydrateQuantity, setHydrateQuantity] = useState('100');

  const demiQuantity = hydrateQuantity / 2;

  const addHydrate = (vol) => {
    let dayVol = blueBar - (150 * vol) / hydrateQuantity;
    if (dayVol <= 10) {
      dayVol = 10;
      Alert.alert(`Objectif journalier d'hydratation atteint!`);
    }
    setBlueBar(dayVol);
    dispatch(hydrate({ quantity: dayVol }));
  };

  const resetHydrate = () => {
    setBlueBar(160);
    dispatch(hydrate({ quantity: 160 }));
  };

  const setHydrate = (value) => {
    setHydrateQuantity(value);
    dispatch(hydrate({ objQuantity: value, dateDate: date2 }));
  };

  // useEffect(() => {
  //   if (dayDate && date2 !== dayDate) {
  //     resetHydrate();
  //   }
  // }, []);

  return (
    <View style={styles.container}>
      <Svg height="90%" width="100%" viewBox="0 0 100 250" style={styles.svg}>
        <Rect
          x="25"
          y="25"
          rx="25"
          ry="10"
          width="50"
          height="200"
          fill="#ffffff"
        />
        <Rect
          x="25"
          y="45"
          rx="25"
          ry="10"
          width="50"
          height="180"
          fill="lightblue"
        />
        <Rect x="25" y="45" width="50" height={blueBar} fill="#ffffff" />

        <Line x1="25" y1="205" x2="30" y2="205" stroke="#000" />
        <Line x1="25" y1="190" x2="30" y2="190" stroke="#000" />
        <Line x1="25" y1="175" x2="30" y2="175" stroke="#000" />
        <Line x1="25" y1="160" x2="30" y2="160" stroke="#000" />
        <Line x1="25" y1="145" x2="30" y2="145" stroke="#000" />
        <Line x1="25" y1="130" x2="30" y2="130" stroke="#000" />
        <Line x1="25" y1="115" x2="30" y2="115" stroke="#000" />
        <Line x1="25" y1="100" x2="30" y2="100" stroke="#000" />
        <Line x1="25" y1="85" x2="30" y2="85" stroke="#000" />
        <Line x1="25" y1="70" x2="30" y2="70" stroke="#000" />
        <Line x1="25" y1="55" x2="30" y2="55" stroke="#000" />
      </Svg>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => resetHydrate()}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      <View style={styles.obj}>
        <Text style={styles.objText}>{hydrateQuantity} CL</Text>
      </View>
      <View style={styles.miObj}>
        <Text style={styles.objText}>{demiQuantity} CL</Text>
      </View>
      <View style={styles.startObj}>
        <Text style={styles.objText}> &nbsp;&nbsp;0 CL</Text>
      </View>

      <View style={styles.dayObj}>
        <Text style={styles.dayObjText}>
          {" "}
          Mon objectif hydratation du jour :
        </Text>
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="0"
          onChangeText={(value) => setHydrateQuantity(value)}
          value={hydrateQuantity}
        ></TextInput>
      </View>
      <View style={styles.cl}>
        <Text style={styles.clText}>CL</Text>
      </View>

      <View style={styles.slider}>
        <Text style={styles.sliderValue}>{sliderHydrateValue} CL</Text>
        <Slider
          style={{ width: "70%" }}
          minimumValue={0}
          maximumValue={100}
          step={10}
          value={sliderHydrateValue}
          onValueChange={(value) => setSliderHydrateValue(value)}
          minimumTrackTintColor="#E76F51"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => addHydrate(sliderHydrateValue)}
        >
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEFAF7",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  svg: {
    backgroundColor: "#2A9D8F",
  },
  slider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    height: "10%",
  },
  sliderValue: {
    marginLeft: 13,
    width: 50,
  },
  obj: {
    position: "absolute",
    top: 125,
    left: 40,
  },
  miObj: {
    position: "absolute",
    top: 315,
    left: 40,
  },
  startObj: {
    position: "absolute",
    top: 505,
    left: 40,
  },
  objText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  dayObj: {
    position: "absolute",
    top: 600,
    left: 20,
  },
  dayObjText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#264653",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 20,
  },
  input: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: "#264653",
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    top: 592,
    left: 270,
  },
  cl: {
    position: "absolute",
    top: 600,
    left: 325,
  },
  clText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "#264653",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 20,
    position: "absolute",
    top: 50,
    right: 20,
  },
  buttonText: {
    color: "white",
  },
});
