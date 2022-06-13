import React, { useEffect } from "react";
import { View, Text, Dimensions, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ResponseType, useAuthRequest } from "expo-auth-session";
// @ts-ignore
import { storeData } from "../utils/storage";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../redux/slices/user";
import Home from "./Home";
const { width: wWidth, height: wHeight } = Dimensions.get("window");
const CLIENT_ID = "133d1b7cd9494537b4d5550761db2735"
const CLIENT_SECRET = "fc1d8b938c114bebb5d06c363f94876e"
const Login = (props: any) => {
  const dispatch = useDispatch();
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      usePKCE: false,
      redirectUri: "exp://192.168.108.11:19000/",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      storeData("@access_token", access_token);
      dispatch(getCurrentUser());
      props.navigation.navigate("Home");
    }
  }, [response]);
  if (response?.type === "success") {
    return <Home />
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={{ uri: 'https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png' }} style={{ width: 100, height: 100 }} />
        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontSize: 40, fontFamily: 'Gotham', fontWeight: 'bold' }}>We play the music</Text>
          <Text style={{ fontSize: 40, fontFamily: 'Gotham', fontWeight: 'bold' }}>You enjoy it. Deal?</Text>
        </View>
        <TouchableOpacity onPress={() => promptAsync()}>
          <View
            style={{
              backgroundColor: "#18D860",
              width: wWidth * 0.9,
              padding: 15,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30
            }}
          >
            <Text style={{ fontSize: 20, color: 'white', fontWeight: '800' }}>LOGIN</Text>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 30 }}>
          <Text style={{ color: 'grey', fontSize: 15 }}>By clicking on login you will</Text>
          <Text style={{ color: 'grey', fontSize: 15 }}>redirect to the spotify login.</Text>
        </View>
      </View>
    )
  }
};

export default Login;
