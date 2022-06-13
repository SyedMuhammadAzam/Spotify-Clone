import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  View
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";

import {
  Box,
  Text,
  theme,
  Header,
  AppThumbnail,
} from "../components";
import { apiEndpoints } from "./../services/api";
import axiosInstance from "./../services/axiosInterceptor";

const Home = (props: any) => {
  const { id } = props.route.params
  const [tracks, setTracks] = useState<any>([]);
  useEffect(() => {
    console.log(id)
    async function getToken() {
      const url = await apiEndpoints.getAlbums(id);

      try {
        const response: any = await axiosInstance.get(url);
        console.log(response, "response")
        setTracks(response.data)
        return response.data;
      } catch (error) {
        return error;
      }
    }
    getToken();

  }, []);
  const handleNavigation = (data: any, image: any) => {
    props.navigation.navigate("Detail", { data: { data: data, image: image } });
  };
  console.log(tracks, "tracks")
  return (
    <SafeAreaView style={styles.container}>

      <LinearGradient style={{ flex: 1 }} colors={["#596164", "#000000"]}>
        <ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginLeft: 5 }}>
            <TouchableOpacity onPress={() => {
              props.navigation.goBack();
            }}>
              <Icon
                color={"#ffffff"}
                name={Platform.OS === "android" ? "arrow-left" : "chevron-left"}
                size={30}
              />
            </TouchableOpacity>

            <Box marginVertical="l">
              <Header title="List of Tracks" />
            </Box>
          </View>
          <Box>
            <ScrollView>
              <Box>
                <Text
                  marginVertical="m"
                  variant="listTitle"
                  marginHorizontal="m"
                >
                  {/* {item.title} */}
                </Text>
                <Box>
                  <ScrollView>
                    {
                      tracks?.tracks?.items?.map((item: any, i: number) => {
                        return (
                          <AppThumbnail
                            onPress={() => handleNavigation(item, tracks?.images[0].url)}
                            images={tracks?.images[0].url}
                            name={item?.name}
                            artist={item?.artists[0].name}
                            popularity={tracks?.popularity}
                          />
                        );
                      })}
                  </ScrollView>
                </Box>
              </Box>
            </ScrollView>
          </Box>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: theme.colors.primary,
    flex: 1,
  },
  thumbImage: {
    height: 120,
    width: 120,
    borderRadius: theme.borderRadii.m,
  },
});

export default Home;
