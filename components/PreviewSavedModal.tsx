import React, {useEffect, useRef, useState} from "react";
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    ActivityIndicator
} from "react-native";
import { useModalContext } from "@/contexts/ModalContext";
import {useAuthContext} from "@/contexts/AuthContext";
import {router} from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface OTPModalProps {
    type: string;
    email: string;
}

export default function PreviewSavedModal({ type, email }: OTPModalProps) {
    const { setIsModalOpen } = useModalContext();
    const { onVerifyEmail, onVerify } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [isFormValidated, setIsFormValidated] = useState<boolean>(false);
    const [otpStatus, setOtpStatus] = useState<string>("none");
    const [verifyModal, setVerifyModal] = useState<boolean>(false);

    // Create references for each TextInput
    const inputRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];
    const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", ""]);

    // Handler for text change
    const handleTextChange = (text: string, index: number) => {
        const updatedOtpValues = [...otpValues];
        updatedOtpValues[index] = text;
        setOtpValues(updatedOtpValues);

        if (text.length === 1) {
            // If the current input has a value, move to the next one
            if (index < inputRefs.length - 1) {
                inputRefs[index + 1].current?.focus();
            }
        }
    };

    // Handler for key press
    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0) {
            // Move focus to the previous input if Backspace is pressed and current input is empty
            inputRefs[index - 1].current?.focus();
        }
    };

    useEffect(() => {
        // Check overall form validity
        const allValid = otpValues.every((value) => value !== "");
        setIsFormValidated(allValid);
    }, [otpValues]);

    const handleConfirmOTP = async () => {
        setVerifyModal(true);
        // Convert all OTP values to a single string
        const otp = otpValues.join("");

        setLoading(true);

        if (type === "register" && onVerifyEmail) {
            const result = await onVerifyEmail(email, otp);

            if (result?.error) {
                setOtpStatus("failed");
            } else {
                setOtpStatus("success");
                setTimeout(() => {
                    setIsModalOpen(false);
                    router.replace("/auth/login");
                }, 3000);
            }

            setLoading(false);
        } else if (type === "login" && onVerify) {
            const result = await onVerify(email, otp);

            if (result?.error) {
                setOtpStatus("failed");
            } else {
                setOtpStatus("success");
                setTimeout(() => {
                    setIsModalOpen(false);
                    router.replace("/home");
                }, 3000);
            }

            setLoading(false);
        }
    }

    return (
        <View className="relative w-[324px] h-[285px] rounded-[27px] mx-auto">
            {
                verifyModal &&
                <View className="absolute w-[324px] flex-row items-center justify-center -top-[18px]">
                    <View className={`h-[36px] flex-row items-center px-2 pr-4 space-x-2 rounded-full bg-primary-pending_bg border z-50
                        ${
                        loading ? "bg-neutral-200 border-primary-pending" :
                            !loading && otpStatus === "failed" ? "bg-primary-danger_bg border-primary-danger" :
                                !loading && otpStatus === "success" ? "bg-primary-success_bg border-primary-green" :
                                    "bg-primary-pending_bg"
                    }
                    `}>
                        <View className="">
                            {
                                loading ?
                                    <ActivityIndicator color="#EF9D3E" /> :
                                    !loading && otpStatus === "failed" ?
                                        <Ionicons name="close-circle" size={24} color="#EF4444" /> :
                                        !loading && otpStatus === "success" ?
                                            <Ionicons name="checkmark-circle" size={24} color="#00A991" /> :
                                            null
                            }
                        </View>

                        <Text className={`font-intermedium text-primary-pending 
                            ${
                            loading ? "text-primary-pending" :
                                !loading && otpStatus === "failed" ? "text-primary-danger" :
                                    !loading && otpStatus === "success" ? "text-primary-green" :
                                        "text-primary-success"
                        }
                        `}>
                            {
                                loading ?
                                    "Saving..." :
                                    !loading && otpStatus === "failed" ?
                                        "Saving Preview Failed" :
                                        !loading && otpStatus === "success" ?
                                            "Preview Saved" :
                                            null
                            }
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
                        onPress={() => router.replace("/home")}
                        className="border border-primary-gray-light p-[1px] rounded-full"
                    >
                        <View className="bg-neutral-800 h-[42px] rounded-full flex-row items-center justify-center">
                            <Text className="text-white text-center text-[16px] font-intermedium">
                                Back to home
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <Text className="text-sm font-intermedium text-center">See all previews</Text>
                </View>
            </View>
        </View>
    );
}
