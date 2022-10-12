import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const FeatureRow = ({ title, description, id }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "featured" && _id == "${id}"]{
      ...,
      restaurant[]->{
        ...,
        dishes[]->,
        type->{
           name,
      }
    },
  }[0]`,{id}
    ).then((data) => setRestaurants(data?.restaurant))

  }, [id]);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-sm text-gray-400 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* RestaurantCards */}

      {restaurants?.map((restaurant,index) => (
        <RestaurantCard
        key={index}
        id={restaurant._id}
        imgUrl={restaurant?.image}
        title={restaurant?.name}
        rating={restaurant.rating}
        genre={restaurant.type?.name}
        address={restaurant.address}
        short_description={restaurant.short_description}
        dishes={restaurant.dishes}
        long= {restaurant.long}
        lat={restaurant.lat}
        />
      ))}
      </ScrollView>
    </View>
  );
};

export default FeatureRow;
