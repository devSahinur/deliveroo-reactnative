import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeatureRow from "../components/FeatureRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      //   title: "Home",
      //   headerStyle: { backgroundColor: "#f4511e" },
      //   headerTintColor: "#fff",
      //   headerTitleStyle: { fontWeight: "bold" },
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"]{
      ...,
  restaurant[]->{
    ...,
    dishes[]->,
  }
}`
      )
      .then((data) => setFeaturedCategories(data))
      .catch(console.error);
  }, []);
  console.log(featuredCategories[0]?.name);
  return (
    <SafeAreaView className="bg-white pt-5 mt-4">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-5">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-100 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-xs text-gray-400">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon color="#00CCBB" size={20} />
          </Text>
        </View>
        <UserIcon color="#00CCBB" size={35} />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 px-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants, Food, etc."
            keyboardType="default"
          />
        </View>
        <AdjustmentsHorizontalIcon color="#00CCBB" />
      </View>
      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Categories />
        {/* Featured Rows */}
        {featuredCategories.map((category,index) => (
          <FeatureRow
            key={index}
            id={category._id}
            title={category?.name}
            description={category?.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
