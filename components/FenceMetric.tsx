import { View, Text } from "react-native";
import {FenceMetricProps} from "@/utils/Types";

export const FenceMetric: React.FC<FenceMetricProps> = ({ label, value }) => {
    return (
        <View className="flex-row">
            <Text className="font-medium text-neutral-500">{label}</Text>
            <Text className="font-semibold text-emerald-950">{value}</Text>
        </View>
    );
};
