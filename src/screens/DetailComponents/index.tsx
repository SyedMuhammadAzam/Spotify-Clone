import { Dimensions, Image, Platform, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Box, Text, Header } from "../../components";
import { Feather as Icon } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
const { width: wWidth } = Dimensions.get("window");

const DetailComponent = (props: any) => {
  const { data, image } = props.route.params.data
  console.log(data, image)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient style={{ flex: 1 }} colors={["#596164", "#000000"]}>
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
            <Header title={data.name} />
          </Box>
        </View>

        <ScrollView>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Box py={"s"} flexDirection={"row"}>
              <Box marginVertical={"l"} ml={"m"}>
                <Image
                  style={{ width: wWidth - 100, height: wWidth - 120 }}
                  source={{ uri: image }}
                />
              </Box>
            </Box>
            <Box marginHorizontal={"s"} marginTop={"l"}>
              <Text color={"text"} fontSize={20} fontWeight={"bold"}>
                Name: {data.name}
                {/* artists, Album, duration.  */}
              </Text>
              <Text color={"text"}>Artist: {data.artists[0].name}</Text>
              <Text color={"text"}>Duration: {data.duration_ms}</Text>
            </Box>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 30 }}>
              <AntDesign name="caretleft" size={44} color="#18D860" />
              <AntDesign name="play" size={44} color="#18D860" style={{ marginHorizontal: 25 }} />
              <AntDesign name="caretright" size={44} color="#18D860" />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default DetailComponent;
