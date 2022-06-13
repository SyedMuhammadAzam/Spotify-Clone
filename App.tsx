import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "./src/components";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import { Provider, useSelector } from "react-redux";
import { store } from "./src/redux";
import { getData } from "./src/utils/storage";
import DetailComponent from "./src/screens/DetailComponents";
import Tracks from "./src/screens/Tracks";
import { StatusBar } from "react-native";
const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const user = await getData("@access_token");
    if (!user) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  };
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Detail"
              component={DetailComponent}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Tracks"
              component={Tracks}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
