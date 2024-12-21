import {Image, Switch, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState} from "react";
import {router} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const Customizations = () => {
    const [lastSession, setLastSession] = useState(false);
    const [theme, setTheme] = useState("dark");

    const handleTheme = (theme: string) => {
        setTheme(theme);
    }

    return (
        <SafeAreaView className="p-4">
            <TouchableOpacity onPress={() => router.back()} className="flex flex-row items-center space-x-2">
                <Image source={require("../../assets/icons/back.png")} className="w-[16px] h-[12px]" />
                <Text className="font-intersb text-[20px]">Settings</Text>
            </TouchableOpacity>

            <View className="mt-10 space-y-4">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-[14px] font-intermedium text-primary-text">Save last session</Text>
                        <Text className="font-intermedium text-[14px] text-gray-200 my-1 max-w-[300]">
                            Continue AR preview from where you left off.
                        </Text>
                    </View>
                    <View>
                        <Switch
                            trackColor={{ false: "#ABADAC", true: "#90CBF9" }}
                            thumbColor={lastSession ? "#2C98F0" : "#818483"}
                            onValueChange={() => setLastSession((previousState) => !previousState)}
                            value={lastSession}
                        />
                    </View>
                </View>

                <View>
                    <Text className="text-[14px] font-intermedium text-primary-text">Theme</Text>
                    <Text className="font-intermedium text-[14px] text-gray-200 my-1 max-w-[300]">
                        Toggle between light and dark mode.
                    </Text>
                    <View className="flex-row justify-between mt-3">
                        <Theme
                            name="dark"
                            theme={theme}
                            setTheme={handleTheme}
                        />
                        <Theme
                            name="light"
                            theme={theme}
                            setTheme={handleTheme}
                        />
                        <Theme
                            name={"system"}
                            theme={theme}
                            setTheme={handleTheme}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Customizations;

declare type ThemeProps = {
    name: string;
    theme: string;
    setTheme: (theme: string) => void;
}

const Theme = ({ name, theme, setTheme }: ThemeProps) => {
    const light = require("../../assets/images/light.png");
    const dark = require("../../assets/images/dark.png");
    const system = require("../../assets/images/system.png");

    return (
        <View>
            <TouchableOpacity onPress={() => setTheme(name)} className={`relative border-2 ${theme === name ? "border-primary-blue" : "border-neutral-200"} rounded-[15px]`}>
                <View className="absolute z-50 top-2 left-2">
                    <Ionicons name="radio-button-on-sharp" size={24} color={theme === name ? "#2C98F0" : "#CECFCF"} />
                </View>
                <Image
                    className="max-w-[123px]"
                    source={name === "light" ? light : name === "dark" ? dark : system}
                />
            </TouchableOpacity>
            <Text className="font-intermedium text-[16px] text-primary-text mt-1">
                { name === "light" ? "Light" : name === "dark" ? "Dark" : "System" }
            </Text>
        </View>
    )
}
