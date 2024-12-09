import {ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useState} from "react";
import {useRouter} from "expo-router";

const Help = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState("");

    const handleSubmit = () => {

    }

    return (
        <SafeAreaView className="p-4">
            <TouchableOpacity onPress={() => router.back()} className="flex flex-row items-center space-x-2">
                <Image source={require("../../assets/icons/back.png")} />
                <Text className="font-intersb text-[20px]">Settings</Text>
            </TouchableOpacity>

            <View className="mt-10">
                <Text className="text-[14px] font-intermedium text-primary-text">Do you have any burning questions?</Text>
                <Text className="font-intermedium text-[14px] text-gray-200 my-1">
                    Do you know how we could do better, or improve our services, please let us know below
                </Text>

                <TextInput
                    className="mt-2 font-intermedium bg-neutral-200 text-primary-text p-4 rounded-[12px] w-full border border-gray-100"
                    value={question}
                    onChangeText={(value) => setQuestion(value)}
                    placeholder="Ask questions"
                    placeholderTextColor={"#CECFCF"}
                    multiline={true}
                    numberOfLines={4}
                />

                <TouchableOpacity
                    onPress={() => handleSubmit()}
                    disabled={loading || question === ""}
                    className="border border-primary-gray-light p-[1px] rounded-[17px] relative top-5"
                >
                    <View className="bg-neutral-800 h-[50px] rounded-[16px] flex-row items-center justify-center">
                        {
                            loading ? (
                                <ActivityIndicator color={"#F6F8FA"}/>
                            ) : (
                                <Text className="text-white text-center text-[16px] font-intermedium">
                                    Submit
                                </Text>
                            )
                        }
                    </View>
                </TouchableOpacity>
            </View>

            <View className="mt-14 space-y-8">
                <View className="space-y-2">
                    <Text className="font-intersb text-[20px]">Frequently asked questions</Text>
                    <Text className="font-intermedium text-[14px] text-gray-200 my-1">
                        See common questions asked by other app users
                    </Text>
                </View>

                <Question
                    question="How do I place a fence in the real world using the AR feature?"
                    description="Whenever I log in to the application, I don’t know how to turn off device previews I don’t know if ot..."
                />

                <Question
                    question="How do you use previewFence?"
                    description="Whenever I log in to the application, I don’t know how to turn off device previews I don’t know if ot..."
                />

                <Question
                    question="How do you use previewFence?"
                    description="Whenever I log in to the application, I don’t know how to turn off device previews I don’t know if ot..."
                />
            </View>
        </SafeAreaView>
    );
};

export default Help;

const Question = ({question, description}: { question: string, description: string }) => (
    <View className="mt-8">
        <Text className="text-[14px] font-intermedium text-primary-text">{question}</Text>
        <Text className="font-intermedium text-[14px] text-gray-200 my-1">{description}</Text>
    </View>
);

