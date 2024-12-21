import * as React from "react";
import { View, Text } from "react-native";
import { SideInfo } from "./SideInfo";
import {SideProps} from "@/utils/Types";

export const Side: React.FC<SideProps> = ({ sideNumber, sideInfo }) => {
    return (
        <View className="items-center px-2 py-3.5 w-full  border-b border-gray-100">
            <View className="w-full">
                <View>
                    <Text className="text-sm font-semibold text-emerald-950">Side {sideNumber}</Text>
                </View>
                <SideInfo width={sideInfo.width} sectionWidth={sideInfo.sectionWidth} />
            </View>
        </View>
    );
};
