import React from "react";
import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {router} from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function PreviewSavedModal() {

    return (
        <View className="relative w-[324px] h-[285px] rounded-[27px] mx-auto">
            {
                <View className="absolute w-[324px] flex-row items-center justify-center -top-[18px]">
                    <View className={`
                        h-[36px] flex-row items-center px-2 pr-4 space-x-2 rounded-full border z-50 bg-primary-success_bg border-primary-green 
                    `}>
                        <View className="">
                            <Ionicons name="checkmark-circle" size={24} color="#00A991" />
                        </View>

                        <Text className={`font-intermedium text-primary-green`}>
                            success
                        </Text>
                    </View>
                </View>
            }

            <View className="bg-white w-full h-[285px] rounded-[27px] flex items-center p-1 space-y-5">
                <View className="w-[64] h-[64] bg-neutral-800 border-primary-gray rounded-full flex justify-center items-center mt-6">
                    <Ionicons name="folder-open" size={20} color="white" />
                </View>

                <Text className="text-[24px] font-interbold">Preview Saved</Text>

                <View className="bg-neutral-300 w-full rounded-[25px] flex-1 p-3 justify-between space-y-1.5">
                    <Text className="font-intermedium text-[16px] text-center text-primary-gray-light">
                        Your preview has been saved you can come back to make changes later
                    </Text>

                    <TouchableOpacity
                        onPress={() => router.replace("/home/savedPreviews")}
                        className="border border-primary-gray-light p-[1px] rounded-full"
                    >
                        <View className="bg-neutral-800 h-[42px] rounded-full flex-row items-center justify-center">
                            <Text className="text-white text-center text-[16px] font-intermedium">
                                Previews
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
