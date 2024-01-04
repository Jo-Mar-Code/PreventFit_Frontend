import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import { useEffect, useState, useCallback } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

export default function NutriRecipeScreen({ navigation, route }) {
  const [recipeImg, setRecipeImg] = useState();
  const [recipeName, setRecipeName] = useState();
  const [recipeText, setRecipeText] = useState();
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeMeasures, setRecipeMeasures] = useState([]);
  const [youtubeId, setYoutubeId] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favList, setFavList] = useState([]);
  const [style, setStyle] = useState({
    position: "absolute",
    top: 30,
    right: 30,
    zIndex: 20,
    color: "#ffffff",
  });
  const userToken = useSelector((state) => state.user.value.token);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params}`
      );
      const data = await response.json();

      const youtubeUrl = data.meals[0].strYoutube;
      if (youtubeUrl) {
        const videoId = youtubeUrl.split("https://www.youtube.com/watch?v=")[1];
        setYoutubeId(videoId);
      }
      const meal = [];
      meal.push(data.meals[0].strMeal, data.meals[0].strInstructions);

      setRecipeImg(data.meals[0].strMealThumb);

      for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;

        if (
          data.meals[0][ingredientKey] &&
          data.meals[0][ingredientKey] !== null &&
          data.meals[0][ingredientKey] !== ""
        ) {
          meal.push(
            data.meals[0][ingredientKey],
            data.meals[0][measureKey] || null
          );
        }
      }

      //       const tradMeal = await fetch('https://api-free.deepl.com/v2/translate', {
      //     method: 'POST',
      //     headers: {
      //       Authorization: "DeepL-Auth-Key dcb75a3b-0294-573b-34ca-32d5ff7bc4dd:fx",
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //         'text': meal,
      //         'source_lang' : 'EN',
      //         'target_lang': 'FR',
      //     })
      // })

      // const dataTrad = await tradMeal.json()

      // const tradMealName = dataTrad.translations[0].text;
      const tradMealName = meal[0];
      setRecipeName(tradMealName);

      // const tradMealText = dataTrad.translations[1].text;
      const tradMealText = meal[1];
      setRecipeText(tradMealText);

      const ingredients = [];
      // for (let i = 2; i < dataTrad.translations.length; i = i+2) {
      //   ingredients.push(dataTrad.translations[i]);
      // }
      for (let i = 2; i < meal.length; i = i + 2) {
        ingredients.push(meal[i]);
      }
      setRecipeIngredients(ingredients);

      const measures = [];
      // for (let i = 3; i < dataTrad.translations.length; i = i+2) {
      //   measures.push(dataTrad.translations[i]);
      // }
      for (let i = 3; i < meal.length; i = i + 2) {
        measures.push(meal[i]);
      }
      setRecipeMeasures(measures);

      fetch("http://192.168.1.22:3000/users/favRecipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: userToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          setFavList(data.fav);

          if (data.fav.includes(Number(route.params))) {
            console.log("favorite recipe");
            setIsFavorite(true);
            setStyle({
              position: "absolute",
              top: 30,
              right: 30,
              zIndex: 20,
              color: "red",
            });
          } else {
            console.log("not favorite recipe");
          }
        });
    })();
  }, []);

  const ingredientsList = recipeIngredients.map((data, i) => {
    // return <Text key={i}>{`\u2022 ${data.text}`}</Text>
    return <Text key={i}>{`\u2022 ${data}`}</Text>;
  });

  const measuresList = recipeMeasures.map((data, i) => {
    // return <Text key={i}>{`\u2023 ${data.text}`}</Text>
    return <Text key={i}>{`\u2023 ${data}`}</Text>;
  });

  const addFav = () => {
    console.log("click");

    if (!isFavorite) {
      const newFav = favList;
      newFav.push(Number(route.params));

      fetch("http://192.168.1.22:3000/users/addFavRecipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: userToken, recipeId: newFav }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsFavorite(true);
          setFavList(newFav);
          setStyle({
            position: "absolute",
            top: 30,
            right: 30,
            zIndex: 20,
            color: "red",
          });
          console.log(data, "Recette favorite ajoutée");
        });
    } else {
      const deletedFav = favList.filter(function (valeur) {
        return valeur !== Number(route.params);
      });

      fetch("http://192.168.1.22:3000/users/addFavRecipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: userToken, recipeId: deletedFav }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsFavorite(false);
          setFavList(deletedFav);
          setStyle({
            position: "absolute",
            top: 30,
            right: 30,
            zIndex: 20,
            color: "#ffffff",
          });
          console.log(data, "Recette favorite supprimée");
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: "30%",
          width: "100%",
        }}
        source={{ uri: recipeImg }}
      />
      <Image
        style={{
          position: "absolute",
          top: 0,
          height: "39%",
          width: "100%",
          zIndex: 10,
        }}
        source={require("../assets/papier.png")}
      />

      <FontAwesome
        name="heart"
        size={40}
        style={style}
        onPress={() => addFav()}
      />

      <ScrollView>
        <Text style={styles.title}>{recipeName}</Text>

        <View>
          <Text style={styles.ingredientsTitle}>Ingrédients</Text>
          <View style={styles.ingredientsContainer}>
            <View style={styles.ingredients}>{ingredientsList}</View>
            <View style={styles.ingredients}>{measuresList}</View>
          </View>
        </View>
        <View>
          <Text style={styles.instructionsTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>{recipeText}</Text>
        </View>
        <View>
          <Text style={styles.videoTitle}>Video</Text>
        </View>
        <View>
          <YoutubePlayer
            height={220}
            videoId={youtubeId}
            webViewStyle={{ opacity: 0.99 }}
          />
        </View>
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
    //backgroundColor: '#1F5FBF',
  },
  title: {
    fontSize: 50,
    fontFamily: "AmaticB",
    textAlign: "center",
    margin: 20,
  },
  ingredientsContainer: {
    flexDirection: "row",
    margin: 20,
  },
  ingredientsTitle: {
    fontSize: 40,
    fontFamily: "AmaticB",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  ingredients: {
    width: "50%",
  },
  instructionsTitle: {
    fontSize: 40,
    fontFamily: "AmaticB",
    textAlign: "center",

    textDecorationLine: "underline",
  },
  instructionsText: {
    margin: 20,
    textAlign: "justify",
  },
  videoTitle: {
    fontSize: 40,
    fontFamily: "AmaticB",
    textAlign: "center",
    marginBottom: 20,
    textDecorationLine: "underline",
  },
});
