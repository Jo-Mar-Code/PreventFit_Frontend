import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Recipe from "../components/recipe";

export default function NutriFavScreen({ navigation }) {
  const userToken = useSelector((state) => state.user.value.token);

  const [mealsItems, setMealsItems] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const meal = [];

  useEffect(() => {
    (async () => {
      const response = await fetch("http://192.168.1.22:3000/users/favRecipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: userToken }),
      });
      const data = await response.json();
      setRecipes(data.fav);
    })();
  }, []);

  //const meal = [];

  // const fetchPromises = recipes.map((id) => {
  //   return fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       return { text: data.meals[0].strMeal, id: data.meals[0].idMeal, img: data.meals[0].strMealThumb };
  //     });
  // });

  // // Utilisez Promise.all pour attendre que toutes les Promises soient résolues
  // Promise.all(fetchPromises)
  //   .then(mealData => {
  //     console.log(mealData);
  //     setMealsItems(mealData);
  //   })
  //   .catch(error => console.error("Une erreur s'est produite :", error));

  useEffect(() => {
    const fetchPromises = recipes.map((id) => {
      return fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          return {
            text: data.meals[0].strMeal,
            id: data.meals[0].idMeal,
            img: data.meals[0].strMealThumb,
          };
        });
    });

    // Utilisez Promise.all pour attendre que toutes les Promises soient résolues
    Promise.all(fetchPromises)
      .then((mealData) => {
        console.log(mealData);
        setMealsItems(mealData);
      })
      .catch((error) => console.error("Une erreur s'est produite :", error));

    // if(recipes.length >0) {
    //   recipes.forEach(async (id) =>  {
    //    const response = await fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    //     const data = await response.json()

    //       console.log(data)
    //      setMealsItems([...mealsItems,{text: data.meals[0].strMeal, id: data.meals[0].idMeal, img: data.meals[0].strMealThumb}])

    //   })

    // console.log(mealsItems)
    // }
  }, [recipes]);

  const handlePressRecipeCard = (recipeId) => {
    navigation.navigate("NutriRecipeScreen", recipeId);
  };

  const selectedRecipes = mealsItems.map((data, i) => {
    return (
      <Recipe key={i} {...data} handlePressRecipeCard={handlePressRecipeCard} />
    );
  });
  //console.log(selectedRecipes)

  return (
    <ScrollView style={styles.topContainer}>
      <Text style={styles.title}>Recettes favorites</Text>
      <View style={styles.container}>{selectedRecipes}</View>
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
    paddingBottom: 20,
  },
  recipeContainer: {
    width: "90%",
    height: 100,
    backgroundColo: "r#ffffff",
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
    margin: 10,
    backgroundColor: "#2A9D8F",
    borderRadius: 50,
  },
  recipeName: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  recipeText: {
    fontFamily: "FuzzyB",
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
  title: {
    marginTop: 60,
    fontSize: 28,
    color: "#E76F51",
    textAlign: "center",
  },
});
