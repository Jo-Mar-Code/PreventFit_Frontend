import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Recipe(props) {
  return (
    <TouchableOpacity onPress={() => props.handlePressRecipeCard(props.id)}>
      <View style={styles.recipeContainer}>
        <View style={styles.recipeImg}>
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 50,
            }}
            source={{ uri: props.img }}
          />
        </View>
        <View style={styles.recipeName}>
          <Text style={styles.recipeText}>{props.text}</Text>
        </View>
        <View style={styles.recipeArrow}></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  recipeContainer: {
    width: "90%",
    height: 100,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 10,
  },
  recipeImg: {
    width: 90,
    height: 90,
    margin: 20,
    borderRadius: 50,
  },
  recipeName: {
    width: "45%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 20,
  },
  recipeText: {
    fontFamily: "FuzzyB",
    fontSize: 15,
  },
  recipeArrow: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#E76F51",
    transform: [{ rotate: "90deg" }],
  },
});
