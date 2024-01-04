import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import MenuScreen from "./screens/MenuScreen";
import HydrateScreen from "./screens/HydrateScreen";
import NutrilistScreen from "./screens/NutrilistScreen";
import RecupScreen from "./screens/RecupScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import SuiviScreen from "./screens/SuiviScreen";
import ProlistScreen from "./screens/ProlistScreen";
import ParamsScreen from "./screens/ParamsScreen";
import ProcardScreen from "./screens/ProcardScreen";
import NutriRecipeScreen from "./screens/NutriRecipeScreen";
import NutriFavScreen from "./screens/NutriFavScreen";

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import user from "./reducers/user";

import FontAwesome from "react-native-vector-icons/FontAwesome";


const reducers = combineReducers({ user });
const persistConfig = { key: 'PreventFit', storage : AsyncStorage};
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
 });
 const persistor = persistStore(store);
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MenuStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      style={styles.container}
    >
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
      <Stack.Screen name="ProlistScreen" component={ProlistScreen} />
      <Stack.Screen name="ProcardScreen" component={ProcardScreen} />
      <Stack.Screen name="SuiviScreen" component={SuiviScreen} />
      <Stack.Screen name="ParamsScreen" component={ParamsScreen} />
    </Stack.Navigator>
  );
};

const NutriStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      style={styles.container}
    >
      <Stack.Screen name="NutrilistScreen" component={NutrilistScreen} />
      <Stack.Screen name="NutriRecipeScreen" component={NutriRecipeScreen} />
      <Stack.Screen name="NutriFavScreen" component={NutriFavScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Menu") {
            iconName = "bars";
          } else if (route.name === "Hydratation") {
            iconName = "tachometer";
          } else if (route.name === "Nutrition") {
            iconName = "cutlery";
          } else if (route.name === "Récupération") {
            iconName = "bed";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#264653",
        headerShown: false,
        tabBarActiveBackgroundColor: "#264653",
      })}
    >
      <Tab.Screen name="Menu" component={MenuStack} />
      <Tab.Screen name="Hydratation" component={HydrateScreen} />
      <Tab.Screen name="Nutrition" component={NutriStack} />
      <Tab.Screen name="Récupération" component={RecupScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
       <PersistGate persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          style={styles.container}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="SigninScreen" component={SigninScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
