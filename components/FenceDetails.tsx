import { View, Text } from "react-native";
import { FenceMetric } from "./FenceMetric";
import {FenceDetailsProps} from "@/utils/Types";
import React from "react";

export const FenceDetails: React.FC<FenceDetailsProps> = ({ title, metrics }) => {
    return (
        <View className="p-3 rounded-3xl border border-solid bg-zinc-100 border-stone-300">
            <View className="flex-col w-full">
                <View className="">
                    <Text className="text-base font-intersb text-emerald-950">{title}</Text>
                </View>
                <View className="py-1.5 mt-2 w-full capitalize border-t border-solid border-t-stone-300">
                    <View className="flex-row flex-wrap gap-2 w-full">
                        {metrics.map((metric, index) => (
                            <View key={metric.label} className="flex-row items-center">
                                <FenceMetric label={metric.label} value={metric.value} />
                                {index < metrics.length - 1 && (
                                    <View className="flex shrink-0 self-stretch my-auto w-1 h-1 rounded-2xl bg-emerald-950 ml-2" />
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
};
