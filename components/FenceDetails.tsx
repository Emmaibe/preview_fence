import { View, Text } from "react-native";
import { FenceMetric } from "./FenceMetric";
import { FenceDetailsProps } from "@/utils/Types";
import React from "react";
import { inchesToFeet } from "@/utils/helperfunctions/HelperFunctions";

export const FenceDetails: React.FC<FenceDetailsProps> = ({
  fence,
}) => {
  return (
    <View className="p-3 rounded-3xl border border-solid bg-zinc-100 border-stone-300">
      <View className="flex-col w-full">
        <View className="">
          <Text className="text-base font-intersb text-emerald-950">
            {fence.name}
          </Text>
        </View>
        <View className="py-1.5 mt-2 w-full capitalize border-t border-solid border-t-stone-300">
          <View className="flex-row flex-wrap gap-2 w-full">
            <View className="flex-row items-center gap-2 flex-wrap">
              <FenceMetric label={"Unit width"} value={inchesToFeet(fence.unitWidth).toString()} />
              <FenceMetric label={"Unit height"} value={inchesToFeet(fence.unitHeight).toString()} />
              <FenceMetric label={"Gate width"} value={inchesToFeet(fence.gateWidth).toString()} />
              <FenceMetric label={"Gate height"} value={inchesToFeet(fence.gateWidth).toString()} />
              {/* <View className="flex shrink-0 self-stretch my-auto w-1 h-1 rounded-2xl bg-emerald-950 ml-2" /> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
