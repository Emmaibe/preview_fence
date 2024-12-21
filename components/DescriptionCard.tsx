import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {DescriptionCardProps} from "@/utils/Types";
import { Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export const DescriptionCard: React.FC<DescriptionCardProps> = ({
    description,
    lastEdited
}) => {
    return (
        <TouchableOpacity
            onPress={() => router.push("/home/fenceDetails")}
            className="flex-row justify-between items-center p-3 rounded-3xl border border-solid bg-zinc-100 border-stone-300"
        >
            <View className="w-[85%]">
                <View className="text-xs font-intermedium text-neutral-500">
                    <Text>{description}</Text>
                </View>
                <View className="flex-row py-1.5 mt-2 text-xs capitalize border-t border-solid border-t-stone-300">
                    <Text className="font-intersb text-emerald-950">Last edited: </Text>
                    <Text className="font-intermedium text-red-500">{lastEdited}</Text>
                </View>
            </View>
            <View className="justify-center items-center rounded-full bg-white bg-opacity-70 h-[38px] min-h-[38px] w-[38px]">
                <Octicons name="arrow-right" size={24} color="black" />
            </View>
        </TouchableOpacity>
    );
};
