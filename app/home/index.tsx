import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Search from "@/components/Search";
import { useFenceDataContext } from "@/contexts/FenceDataContext";
import { FenceData } from "@/utils/Types";
import { useAuthContext } from "@/contexts/AuthContext";
import SavedPreviews from "./savedPreviews";

const Index = () => {
  const { fenceData, fetchFenceData, fenceLoading, setSelectedFence } =
    useFenceDataContext();
  const [data, setData] = useState<FenceData[]>();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  //   const {authState} = useAuthContext();

  useEffect(() => {
    fetchFenceData();
  }, []);

  useEffect(() => {
    // !authState?.authenticated && router.replace("/");
  });

  useEffect(() => {
    setData(
      fenceData.filter(
        (fence) =>
          fence.name.includes(
            selectedCategory === "All category" ? "" : selectedCategory
          ) ||
          fence.description.includes(
            selectedCategory === "All category" ? "" : selectedCategory
          )
      )
    );
  }, [fenceData, selectedCategory]);

  const setCategory = (name: string) => {
    setSelectedCategory(name);
  };

  const handleSelectFence = (fence: FenceData) => {
    setSelectedFence(fence);
    router.push("/home/fenceUnit");
  };

  return (
    <SafeAreaView className="p-4 dark:border-gray-400 flex-1">
      <View className="flex-row justify-between items-center px-2 mb-2">
        <Text className="font-interextrabold text-[20px]">Preview Fence</Text>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Image source={require("../../assets/icons/setting.png")} />
        </TouchableOpacity>
      </View>

      {/* <Search
                placeholder="Find dimensiona, Materials, etc"
                search={search}
                setSearch={setSearch}
            /> */}

      {/* <FlatList
        data={cat}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className=""
        renderItem={({ item, index }) => (
            <Category
              key={index}
              category={item}
              isSelected={item.name === selectedCategory}
              setCategory={setCategory}
            />
        )}
      /> */}

      <View className="flex-1">
        <FlatList
          data={!fenceLoading ? data : []}
          className="rounded-[12px] flex-1 h-[50%]"
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleSelectFence(item)}
              key={index}
              className="my-2 w-full"
            >
              <Image
                source={{ uri: item.imageUrls[0] }}
                className="w-full h-[200px] rounded-[12px]"
              />
              <Text className="mt-1 text-base font-intersb">
                <Text>Name: </Text> {item.name}
              </Text>
              <Text className="text-sm font-intermedium">
                <Text>Description: </Text> {item.description}
              </Text>
            </TouchableOpacity>
          )}
        />

        <View className="h-[50%]">
          <SavedPreviews asComp />
        </View>
      </View>

      {/* <TouchableOpacity
        onPress={() => router.push("/home/savedPreviews")}
        className="absolute bottom-10 right-5 w-[64] h-[64] bg-neutral-800 border-2 border-white rounded-full flex justify-center items-center mt-6"
      >
        <Ionicons name="folder-open" size={20} color="white" />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default Index;

declare interface CategoryProps {
  category: { name: string; count: number };
  isSelected: boolean;
  setCategory: (name: string) => void;
}
const Category = ({ category, isSelected, setCategory }: CategoryProps) => {
  return (
    <TouchableOpacity
      onPress={() => setCategory(category.name)}
      style={{ alignSelf: "flex-start" }}
      className={`mr-2 flex-row items-center py-2 px-4 rounded-full border ${
        !isSelected ? "border-gray-100" : "border-primary-gray-light"
      } `}
    >
      <Text
        className={`font-intersb ${!isSelected ? "text-primary-text" : ""}`}
      >
        {category.name}
      </Text>
      {/* <Entypo
        name={"dot-single"}
        size={18}
        color={isSelected ? "#000" : "#022924"}
      />
      <Text
        className={`font-intersb text-[13px] ${
          !isSelected ? "text-gray-200" : "text-primary-green"
        }`}
      >
        {category.count} {isSelected && "fences"}
      </Text> */}
    </TouchableOpacity>
  );
};

const cat = [
  {
    name: "All category",
    count: 10224,
  },
  {
    name: "Ornamental",
    count: 501,
  },
  {
    name: "Chainlink",
    count: 160,
  },
  {
    name: "PVC",
    count: 195,
  },
  {
    name: "Wood",
    count: 140,
  },
  {
    name: "Aluminium",
    count: 90,
  },
  {
    name: "Steel",
    count: 100,
  },
  {
    name: "Vinyl",
    count: 120,
  },
  {
    name: "Composite",
    count: 80,
  },
  {
    name: "Bamboo",
    count: 70,
  },
];
