import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";
import { useSelector } from "react-redux";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  return (
    <View className="bg-primary flex-1">
      <SafeAreaView className="pt-[25px] ">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color={"white"} size={30} />
          </TouchableOpacity>
          <Text className=" text-white font-bold">Order Help</Text>
        </View>
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://links.papareact.com/fls",
              }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar size={30} indeterminate={true} color={"#00CCBB"} />
          <Text className="mt-2">
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: 26.038892438846577,
          longitude: 88.44299779942477,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: 26.038892438846577,
            longitude: 88.44299779942477,
          }}
          title={restaurant.title}
          description={restaurant.description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-12 w-12 rounded-full p-5 bg-gray-300 ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Sahinur Islam</Text>
          <Text className="text-gray-400">Your delivery person</Text>
        </View>
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${"01788215840"}`)}
        >
          <Text className="text-primary text-lg mr-5 font-bold">Call</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
