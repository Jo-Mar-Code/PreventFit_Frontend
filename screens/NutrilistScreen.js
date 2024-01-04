import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import { useFonts } from 'expo-font';
import { useSelector } from "react-redux";

import Recipe from "../components/recipe";

const types = [];

export default function NutrilistScreen({ navigation }) {
  const userToken = useSelector((state) => state.user.value.token);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [mealsCat, setMealsCat] = useState([]);
  const [mealsItems, setMealsItems] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await response.json();

      const mealsCatArr = [];
      data.categories.forEach((cat) => {
        mealsCatArr.push(cat.strCategory);
      });
      for (let cat of mealsCatArr) {
        types.push({ enValue: cat });
      }

      //       const traductor = await fetch('https://api-free.deepl.com/v2/translate', {
      //     method: 'POST',
      //     headers: {
      //       Authorization: "DeepL-Auth-Key dcb75a3b-0294-573b-34ca-32d5ff7bc4dd:fx",
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //         'text': mealsCatArr,
      //         'source_lang' : 'EN',
      //         'target_lang': 'FR',
      //     })
      // })
      // const dataTrad = await traductor.json()

      // const tradMealsCatArr = [];
      // dataTrad.translations.forEach( tradCat => {
      //   tradMealsCatArr.push(tradCat.text);
      //   });

      const tradMealsCatArr = mealsCatArr;

      let newTypes = types.map((type, index) => {
        return {
          ...type,
          value: tradMealsCatArr[index],
          label: tradMealsCatArr[index],
        };
      });
      setMealsCat(newTypes);
    })();
  }, []);

  const itemsCatArr = [];
  const itemsIdArr = [];
  const itemsImgArr = [];

  const handleCat = (cat) => {
    (async () => {
      const response = await fetch(
        `http://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
      );
      const data = await response.json();

      data.meals.forEach((item) => {
        itemsCatArr.push(item.strMeal);
        itemsIdArr.push(Number(item.idMeal));
        itemsImgArr.push(item.strMealThumb);
      });

      //       const traductor = await fetch('https://api-free.deepl.com/v2/translate', {
      //     method: 'POST',
      //     headers: {
      //       Authorization: "DeepL-Auth-Key dcb75a3b-0294-573b-34ca-32d5ff7bc4dd:fx",
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //         'text': itemsCatArr,
      //         'source_lang' : 'EN',
      //         'target_lang': 'FR',
      //     })
      // })
      // const dataTrad = await traductor.json()

      //   const tradMealsItemsArr = [];
      //   dataTrad.translations.forEach( tradItem => {

      //     tradMealsItemsArr.push(tradItem.text);
      //     });

      const tradMealsItemsArr = itemsCatArr;

      let newItems = tradMealsItemsArr.map((item, index) => {
        return { text: item, id: itemsIdArr[index], img: itemsImgArr[index] };
      });
      setMealsItems(newItems);
    })();
  };

  const handlePressRecipeCard = (recipeId) => {
    navigation.navigate("NutriRecipeScreen", recipeId);
  };

  const selectedRecipes = mealsItems.map((data, i) => {
    return (
      <Recipe key={i} {...data} handlePressRecipeCard={handlePressRecipeCard} />
    );
  });

  return (
    <ScrollView style={styles.topContainer}>
      <Text style={styles.title}>Nutrition</Text>
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "#2A9D8F" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={mealsCat}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "  Catégorie" : ""}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            handleCat(item.enValue);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <FontAwesome name="search" size={20} color="#000000" />
          )}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("NutriFavScreen")}
          style={styles.button}
        >
          <Text style={styles.textButton}>
            <FontAwesome name="heart" size={15} color={"red"} /> Recettes
            favorites{" "}
          </Text>
        </TouchableOpacity>

        {selectedRecipes}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "#FEFAF7",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    backgroundColor: "#FEFAF7",
  },
  dropdown: {
    height: 50,
    width: 300,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: {
    display: "flex",
    backgroundColor: "#264653",
    minWidth: "50%",
    minHeight: 40,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 40,
    marginTop: 40,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textButton: {
    color: "white",
    textAlign: "center",
    //fontSize: 20,
  },
  title: {
    marginTop: 60,
    fontSize: 28,
    color: "#E76F51",
    textAlign: "center",
  },
});
