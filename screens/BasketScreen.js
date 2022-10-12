import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  removedToBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { selectRestaurant } from "../features/restaurantSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const [groupedItemInBasket, setGroupedItemInBasket] = useState([]);

  const basketTotal = useSelector(selectBasketTotal);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemInBasket(groupedItems);
  }, [items]);

  // console.log(groupedItemInBasket);

  return (
    <SafeAreaView className="mt-7 flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-primary bg-white shadow-xm">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color={"#00CCBB"} size={50} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            // source={{ uri: urlFor(restaurant.imgUrl).url() }}
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 mins</Text>
          <TouchableOpacity>
            <Text className="text-primary">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemInBasket).map(([key, items]) => (
            <View
              key={key}
              className="items-center flex-row space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-primary">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1"> {items[0].title}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="BDT" />
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-primary text-xs"
                  onPress={() => dispatch(removedToBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 mt-5 bg-white space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="BDT" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={5.99} currency="BDT" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className=" font-extrabold">
              <Currency quantity={basketTotal + 5.99} currency="BDT" />
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrder")}
            className="rounded-lg bg-primary p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
