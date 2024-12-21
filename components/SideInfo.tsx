import * as React from "react";
import { View, Text } from "react-native";
import {SideInfoProps} from "@/utils/Types";

export const SideInfo: React.FC<SideInfoProps> = ({ width, sectionWidth }) => {
    return (
        <View className="flex-row items-center mt-1 text-sm flex-wrap">
            <View className="flex-row justify-center items-center">
                <View>
                    <Text className="font-medium text-neutral-500">width:</Text>
                </View>
                <View>
                    <Text className="font-semibold text-emerald-950">{width}</Text>
                </View>
            </View>
            <View className="w-1 h-1 rounded-2xl bg-emerald-950 mx-2" />
            <View className="flex-row items-center">
                <View>
                    <Text className="font-medium text-neutral-500">Section width:</Text>
                </View>
                <View>
                    <Text className="font-semibold text-emerald-950">{sectionWidth}</Text>
                </View>
            </View>
        </View>
    );
};
