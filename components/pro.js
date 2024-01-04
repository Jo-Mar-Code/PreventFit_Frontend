import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

function Pro(props) {
  // console.log(props)

  return (
    <TouchableOpacity onPress={() => props.handlePressProCard(props)}>
      <View style={styles.card}>
        <Text style={styles.name}> {props.Name} </Text>
        <Image
          style={{
            height: "69%",
            width: "100%",
            borderRadius: 50,
          }}
          source={{ uri: props.Image }}
        />

        <Text style={styles.profession}> {props.Profession}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: 160,
    height: 200,
    backgroundColor: "#E9C46A",
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    margin: 10,
  },
  profession: {
    marginTop: 10,
  },
  name: {
    marginBottom: 5,
    textAlign: "center",
  },
});

export default Pro;
