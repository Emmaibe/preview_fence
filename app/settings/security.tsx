import {Image, ImageSourcePropType, Text, TouchableOpacity, View} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {Href, useRouter} from "expo-router";

const Security = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="p-4">
            <TouchableOpacity onPress={() => router.back()} className="flex flex-row items-center space-x-2">
                <Image source={require("../../assets/icons/back.png")} className="w-[16px] h-[12px]" />
                <Text className="font-intersb text-[20px]">Settings</Text>
            </TouchableOpacity>

            <View>
                <Text className="font-intersb text-[20px] mt-12">About PreviewFence</Text>
            </View>

            <View className="mt-2">
                <Setting
                    link={"/settings"}
                    image={require("../../assets/icons/book.png")}
                    title="Privacy policy"
                    description="How previewFence collects and uses information"
                />

                <Setting
                    link={"/settings"}
                    image={require("../../assets/icons/book-saved.png")}
                    title="Open-source licances"
                    description="Libraries that we use"
                />

                <Setting
                    link={"/settings"}
                    image={require("../../assets/icons/information.png")}
                    title="Version"
                    description="22.10.50.0-90011930-10818"
                />
            </View>
        </SafeAreaView>
    );
};

export default Security;

interface SettingProps {
    image: ImageSourcePropType;
    title: string;
    description: string;
    link: Href;
}

const Setting: React.FC<SettingProps> = ({ image, title, description, link }) => {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.push(link)} className="flex-row items-center space-x-3 p-[12px] rounded-[25px] mt-3">
            <View className="bg-neutral-200 w-[46px] p-[10px] rounded-[15px]">
                <Image source={image} />
            </View>

            <View className="">
                <Text className="font-intersb text-[16px]">{title}</Text>
                <Text className="font-intermedium text-[14px] text-gray-200">{description}</Text>
            </View>
        </TouchableOpacity>
    );
}
