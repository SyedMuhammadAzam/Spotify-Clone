import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Text,
  theme,
  Header,
  AppThumbnailOne
} from "../components";
import { fetchUserPlaylist, playlistSelector } from "../redux/slices/playlist";

const Home = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(playlistSelector);
  useEffect(() => {
    dispatch(fetchUserPlaylist());
  }, []);
  console.log(data, "data empty")
  const handleNavigation = (item: any) => {
    navigation.navigate("Tracks", item);
  };
  if (isLoading) {
    return (
      <Box>
        <ActivityIndicator />
      </Box>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={{ flex: 1 }} colors={["#555555", "#000000"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box marginVertical="l">
            <Header title="Albums" iconName="spotify" />
          </Box>
          <Box>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Box>
                <Text
                  marginVertical="m"
                  variant="listTitle"
                  marginHorizontal="m"
                >
                  {/* {item.title} */}
                </Text>
                <Box>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                  // horizontal={true}
                  >
                    {
                      data?.albums?.items?.map((item: any, i: number) => {
                        return (
                          <AppThumbnailOne
                            onPress={() => handleNavigation(item)}
                            images={item.images[0].url}
                            title={item?.name}
                            tracks={item?.total_tracks}
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
