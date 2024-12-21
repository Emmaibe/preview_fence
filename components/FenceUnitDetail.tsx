import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {FenceData} from "@/utils/Types";
import {inchesToFeet} from "@/utils/helperfunctions/HelperFunctions";

const FenceUnitDetail = ({ fence }: { fence: FenceData | null }) => {
    const [images, setImages] = useState([
        require("../assets/images/1.png"),
        // require("../assets/images/2.png"),
        // require("../assets/images/3.png"),
        // require("../assets/images/4.png"),
    ]);
    return (
        <SafeAreaView className="p-4 flex-1 justify-between">
            <View className="flex flex-row items-center justify-between mb-8">
                <TouchableOpacity onPress={() => router.back()} className="flex flex-row items-center space-x-2">
                    <Image source={require("../assets/icons/back.png")} className="w-[16px] h-[12px]" />
                    <Text className="font-intersb text-[20px]">Single wooden fence unit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => console.log("deleted")}>
                    <Feather name="download" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View className="space-y-6">
                <View className="flex-row items-start justify-between">
                    <View>
                        <Text className="text-neutral-800 text-base font-interbold">Fence gate</Text>
                        <UnitDetail title="Width" value={fence?.gateWidth ?? 0} />
                        <UnitDetail title="Height" value={fence?.gateHeight ?? 0} />
                    </View>
                    <View>
                        <Text className="text-neutral-800 text-base font-interbold">Fence section</Text>
                        <UnitDetail title="Unit Height" value={fence?.unitHeight ?? 0} />
                        <UnitDetail title="Min Unit Section Width" value={fence?.minUnitWidth ?? 0} />
                        <UnitDetail title="Max Unit Section Width" value={fence?.maxUnitWidth ?? 0} />
                    </View>
                </View>

                <View className="rounded-[17px] bg-white">
                    <Text className="font-interbold text-[20px] my-5 px-4">Gallery</Text>
                    <View className="flex-row">
                        {fence?.imageUrls.length === 1 && <View className="w-full">
                            <Image source={{ uri: fence?.imageUrls[0] }} className="w-full h-[300px] rounded-[12px]"/>
                        </View>}
                        {images.length > 1 && <>
                            <View className="flex-1">
                                {images.map((image, index) => index % 2 == 0 || index == 0 ? (
                                    <View key={index} className="w-full">
                                        <Image source={image} className="w-full"/>
                                    </View>
                                ) : null)}
                            </View>
                            <View className="flex-col flex-1">
                                {images.map((image, index) => index % 2 != 0 && index != 0 ? (
                                    <View key={index} className="w-full">
                                        <Image source={image} className="w-full h-[200px]"/>
                                    </View>
                                ) : null)}
                            </View>
                        </>}
                    </View>
                </View>
            </View>

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

export default FenceUnitDetail;

const UnitDetail = ({ title, value }: { title: string, value: number}) => {
    return (
        <Text className="text-primary-gray-light text-base font-intermedium">{title}: <Text className="font-intersb">{inchesToFeet(value)}ft</Text></Text>
    )
}
