import {Image, Text, TextInput, TouchableOpacity, View} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState} from "react";
import {useRouter} from "expo-router";
import useFormValidation from "@/hooks/useFormValidation";
import {emailRegex, fullNameRegex, phoneRegex} from "@/utils/Constants";
import {useAuthContext} from "@/contexts/AuthContext";

const Account = () => {
    const router = useRouter();
    const { user } = useAuthContext();

    const {
        formState,
        validityState,
        isFormValid,
        handleChange,
    } = useFormValidation(
        {
            email: user?.email || "",
        },
        {
            email: (value) => emailRegex.test(value)
        }
    );

    return (
        <SafeAreaView className="p-4">
            <TouchableOpacity onPress={() => router.back()} className="flex flex-row items-center space-x-2">
                <Image source={require("../../assets/icons/back.png")} className="w-[16px] h-[12px]" />
                <Text className="font-intersb text-[20px]">Settings</Text>
            </TouchableOpacity>

            <View className="mt-10">
                <Text className="text-[14px] font-intermedium text-primary-text">Email Address</Text>

                <TextInput
                    className={`mt-2 font-intermedium text-primary-text p-4 rounded-[12px] w-full border
                        ${!validityState.email && formState.email !== "" ?
                            "border-primary-danger" :
                            "border-primary-gray-light"
                        }
                    `}
                    value={formState.email}
                    onChangeText={(value) => handleChange("email", value)}
                    placeholder="Enter email address"
                    placeholderTextColor={"#CECFCF"}
                />

                <TouchableOpacity
                    className="border border-primary-gray-light p-[1px] rounded-[17px] relative top-5"
                >
                    <View className="bg-neutral-800 p-[14px] rounded-[16px]">
                        <Text className="text-white text-center text-[16px] font-intermedium">Save changes</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Account;

