import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "category"]`)
      .then((data) => setCategories(data));
  }, []);
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{ paddingHorizontal: 30, paddingTop: 10 }}
      showsHorizontalScrollIndicator={false}
    >
      {/* CategoryCard */}
      {categories?.map((category,index) => (
        <CategoryCard
          key={index}
          id={category._id}
          imgUrl={urlFor(category?.image).width(200).url()}
          title={category?.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
