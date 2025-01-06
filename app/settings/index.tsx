import {Image, ImageSourcePropType, Text, TouchableOpacity, View} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Href, useRouter} from "expo-router";
import {useAuthContext} from "@/contexts/AuthContext";
import RNRestart from "react-native-restart";


const Index = () => {
    const router = useRouter();

    const { onLogout } = useAuthContext();

    const handleLogout = async () => {
        if (onLogout) {
            await onLogout();
        }
        RNRestart.Restart();
    }

    return (
        <SafeAreaView className="p-4">
            <TouchableOpacity onPress={() => router.push("/home")} className="flex flex-row items-center space-x-2">
                <Image source={require("../../assets/icons/back.png")} className="w-[16px] h-[12px]" />
                <Text className="font-intersb text-[20px]">Home</Text>
            </TouchableOpacity>

            <View className="mt-10">
                <Setting
                    link={"/settings/account"}
                    image={require("../../assets/icons/profile.png")}
                    title="Account & subscription"
                    description="Manage your account details"
                />

                <Setting
                    link={"/settings/general"}
                    image={require("../../assets/icons/profile.png")}
                    title="General"
                    description="Manage language, measurements and notifications"
                />

                <Setting
                    link={"/settings/customizations"}
                    image={require("../../assets/icons/profile.png")}
                    title="Customizations"
                    description="Tailor user experience to your device specs"
                />

                <Setting
                    link={"/settings/security"}
                    image={require("../../assets/icons/profile.png")}
                    title="Privacy & security"
                    description="Manage application security"
                />

                <Setting
                    link={"/settings/help"}
                    image={require("../../assets/icons/profile.png")}
                    title="Help and support"
                    description="Contact support and find answers to frequently asked questions"
                />
            </View>

            <View className="my-6 space-y-4">
                <TouchableOpacity onPress={() => handleLogout()} className="flex-row items-center mx-auto space-x-1">
                    <Text className="text-[#C60D10] font-intersb text-[16px]">Log out</Text>
                    <MaterialIcons name="logout" size={20} color="#C60D10" />
                </TouchableOpacity>
                <Text className="font-intermedium text-[16px] text-gray-200 text-center">
                    Log out of PreviewFence and end all sessions
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Index;

interface SettingProps {
    image: ImageSourcePropType;
    title: string;
    description: string;
    link: Href;
}

const Setting: React.FC<SettingProps> = ({ image, title, description, link }) => {
    const router = useRouter();

    // @ts-ignore
    return (
        <TouchableOpacity onPress={() => router.push(link)} className="flex-row items-center space-x-3 bg-gray-100 p-[12px] rounded-[25px] mt-3">
            <View className="bg-gray-300 w-[46px] p-[10px] rounded-[15px]">
                <Image source={image} />
            </View>

            <View className="flex-1">
                <Text className="font-intersb text-[16px]">{title}</Text>
                <Text numberOfLines={1} ellipsizeMode={"tail"} className="font-intermedium text-[14px] text-gray-200">{description}</Text>
            </View>
        </TouchableOpacity>
    );
}
