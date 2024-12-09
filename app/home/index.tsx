import {ScrollView, View, Text, Image, TextInput, TouchableOpacity, FlatList} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useState} from "react";
import {AntDesign, Entypo} from "@expo/vector-icons";
import {router} from "expo-router";

const Index = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All category");

    const setCategory = (name: string) => {
        setSelectedCategory(name);
    }

    return (
        <SafeAreaView className="p-4">
            <ScrollView>
                <View className="flex-row justify-between items-center px-2">
                    <Text className="font-interextrabold text-[20px]">ThePreviewfence</Text>
                    <TouchableOpacity onPress={() => router.push("/settings")}>
                        <Image source={require("../../assets/icons/setting.png")} />
                    </TouchableOpacity>
                </View>

                <View className="mt-8 relative">
                    <View className="absolute top-4 left-3">
                        <AntDesign name="search1" size={24} color={"#000"} />
                    </View>

                    <TextInput
                        className="font-intermedium text-primary-text p-5 pl-11 rounded-[12px] w-full border border-primary-gray-light"
                        value={search}
                        onChangeText={(value) => setSearch(value)}
                        placeholder="Find dimensiona, Materials, etc"
                        placeholderTextColor={"#CECFCF"}
                    />
                </View>

                <FlatList
                    data={cat}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="mt-4"
                    renderItem={({ item, index }) => (
                        <Category key={index} category={item} isSelected={item.name === selectedCategory} setCategory={setCategory} />
                    )}
                />
            </ScrollView>
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
