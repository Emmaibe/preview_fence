import { router } from "expo-router";
import { TouchableOpacity, Image, Text, View, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {FenceDetailContainer} from "@/components/FenceDetailContainer";
import { AntDesign } from "@expo/vector-icons";
import {FenceDimensionDetailsContainer} from "@/components/FenceDimensionDetailsContainer";

const FenceDetails = () => {
    return (
        <SafeAreaView className="p-4 flex-1">
            <View className="flex flex-row items-center justify-between mb-8">
                <TouchableOpacity onPress={() => router.back()} className="flex flex-row items-center space-x-2">
                    <Image source={require("../../assets/icons/back.png")} className="w-[16px] h-[12px]" />
                    <Text className="font-intersb text-[20px]">Preview 001</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => console.log("deleted")}>
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <FenceDetailContainer />

            <Text className="text-primary-text text-base font-intersb my-4">Dimensions</Text>

            <FenceDimensionDetailsContainer />

            <TouchableOpacity
                onPress={() => router.push("/home/preview")}
                className="border border-primary-gray-light p-[1px] rounded-[17px] relative top-5"
            >
                <View className="bg-neutral-800 p-[14px] rounded-[16px]">
                    <Text className="text-white text-center text-[16px] font-intermedium">Use</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default FenceDetails;
