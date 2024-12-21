import * as React from "react";
import { View, Image, Text } from "react-native";
import {ProductCardProps} from "@/utils/Types";

export const ProductCard: React.FC<ProductCardProps> = ({
    imageUrl,
    title,
    company,
    aspectRatio,
    imageWidth,
}) => {

    return (
        <View className="flex flex-col justify-center min-h-[212px]">
            <View className="flex overflow-hidden flex-col flex-1 justify-center w-full rounded-lg border-solid bg-stone-50 border-[0.896px] border-neutral-100">
                <Image
                    source={{ uri: imageUrl }}
                    className={`object-contain w-[${imageWidth}px]`}
                    style={{ aspectRatio }}
                />
            </View>
            <View className="flex flex-col justify-center mt-2 max-w-full rounded-xl w-[125px]">
                <View className="text-sm font-semibold text-emerald-950">
                    <Text>{title}</Text>
                </View>
                <View className="mt-1 text-sm font-medium capitalize text-zinc-500">
                    <Text>{company}</Text>
                </View>
            </View>
        </View>
    );
};
