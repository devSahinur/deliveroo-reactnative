import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeftIcon,
  MapPinIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import {
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // console.log(dishes);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="h-56 bg-gray-300 p-4 w-full "
          />
        </View>
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-10 left-4 p-2 bg-gray-100 rounded-full"
        >
          <ArrowLeftIcon size={20} color={"#00CCBB"} />
        </TouchableOpacity>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" size={22} opacity={0.5} />
                <Text className="text-xs text-gray-400">
                  <Text className="text-green-500">{rating}</Text> . {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" size={22} opacity={0.4} />
                <Text className=" text-xs text-gray-500">
                  Nearby . {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 border-y border-gray-300 p-4">
            <QuestionMarkCircleIcon color="gray" size={22} opacity={0.6} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#00CCBB" size={22} opacity={0.6} />
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="px-4 pt-6 pb-3 font-bold text-xl">Menu</Text>

          {/* Dishrows */}
          {dishes?.map((dish,index) => (
            <DishRow
              key={index}
              id={dish?._id}
              title={dish?.name}
              price={dish?.price}
              description={dish?.short_description}
              image={dish?.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
