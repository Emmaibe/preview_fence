import {ScrollView, View, Text, Image, TextInput, TouchableOpacity, FlatList} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useEffect, useState} from "react";
import {Entypo, Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import Search from "@/components/Search";
import {useFenceDataContext} from "@/contexts/FenceDataContext";
import {FenceData} from "@/utils/Types";
import SavedPreviews from "./savedPreviews";

const Index = () => {
    const { fenceData, fetchFenceData, fenceLoading, setSelectedFence } = useFenceDataContext();

    useEffect(() => {
        fetchFenceData();
    }, []);

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All category");

    const setCategory = (name: string) => {
        setSelectedCategory(name);
    }

    const handleSelectFence = (fence: FenceData) => {
        setSelectedFence(fence);
        router.push("/home/fenceUnit");
    }

    return (
        <SafeAreaView className="p-4 dark:border-gray-400 flex-1">
            <View className="flex-row justify-between items-center px-2 mb-8">
                <Text className="font-interextrabold text-[20px]">ThePreviewfence</Text>
                <TouchableOpacity onPress={() => router.push("/settings")}>
                    <Image source={require("../../assets/icons/setting.png")} />
                </TouchableOpacity>
            </View>

            <Search
                placeholder="Find dimensiona, Materials, etc"
                search={search}
                setSearch={setSearch}
            />

            <FlatList
                data={cat}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className="mt-4"
                renderItem={({ item, index }) => (
                    <Category key={index} category={item} isSelected={item.name === selectedCategory} setCategory={setCategory} />
                )}
            />

            <FlatList
                data={!fenceLoading ? fenceData : []}
                className="my-4 rounded-[12px]"
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => handleSelectFence(item)} key={index} className="my-2 w-full">
                        <Image source={{ uri: item.imageUrls[0]}} className="w-full h-[200px] rounded-[12px]"/>
                        <Text className="mt-1 text-base font-intersb"><Text>Name: </Text> {item.name}</Text>
                        <Text className="text-sm font-intermedium"><Text>Description: </Text> {item.description}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* <SavedPreviews asComp/> */}

            <TouchableOpacity
                onPress={() => router.push("/home/savedPreviews")}
                className="absolute bottom-10 right-5 w-[64] h-[64] bg-neutral-800 border-2 border-white rounded-full flex justify-center items-center mt-6"
            >
                <Ionicons name="folder-open" size={20} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Index;

declare interface CategoryProps {
    category: { name: string, count: number };
    isSelected: boolean;
    setCategory: (name: string) => void;
}
const Category = ({ category, isSelected, setCategory }: CategoryProps) => {
    return (
        <TouchableOpacity onPress={() => setCategory(category.name)} style={{ alignSelf: 'flex-start' }} className={`mr-2 flex-row items-center py-2 px-4 rounded-full border ${!isSelected ? "border-gray-100": "border-primary-gray-light"} `}>
            <Text className={`font-intersb ${!isSelected ? "text-primary-text": ""}`}>{category.name}</Text>
            <Entypo name={"dot-single"} size={18} color={isSelected ? "#000" : "#022924"} />
            <Text className={`font-intersb text-[13px] ${!isSelected ? "text-gray-200": "text-primary-green"}`}>{category.count} {isSelected && "fences"}</Text>
        </TouchableOpacity>
    )
}

const cat = [
    {
        name: "All category",
        count: 10224
    },
    {
        name: "Ornamental",
        count: 501
    },
    {
        name: "Chainlink",
        count: 160
    },
    {
        name: "PVC",
        count: 195
    },
    {
        name: "Wood",
        count: 140
    },
    {
        name: "Aluminium",
        count: 90
    },
    {
        name: "Steel",
        count: 100
    },
    {
        name: "Vinyl",
        count: 120
    },
    {
        name: "Composite",
        count: 80
    },
    {
        name: "Bamboo",
        count: 70
    }
]
