import { View, Text, Image } from "react-native";
import {PreviewCardProps} from "@/utils/Types";
import { Octicons } from "@expo/vector-icons";

export const PreviewCard: React.FC<PreviewCardProps> = ({
    title,
    subtitle,
    iconUrl,
}) => {
    return (
        <View className="flex-row items-center px-2.5 py-3 rounded-xl border border-dashed shadow-sm bg-gray-150 border-stone-300">
            <View className="flex flex-col shrink self-stretch my-auto basis-0 min-w-[240px]">
                <Text className="text-sm font-intersb text-emerald-950">{title}</Text>
                <Text className="text-xs font-intermedium text-neutral-500">{subtitle}</Text>
            </View>
            <View className="items-end ml-auto">
                <Octicons name="plus-circle" size={16} color="black" />
            </View>
        </View>
    );
};
