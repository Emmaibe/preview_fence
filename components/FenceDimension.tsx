import * as React from "react";
import { View, Text } from "react-native";
import { Side } from "./Side";
import { FenceDimensionProps } from "@/utils/Types";

export const FenceDimension: React.FC<FenceDimensionProps> = ({
  sides,
  gate,
  description,
}) => {
  return (
    <View className="items-start px-2 pt-3 pb-14 rounded-3xl border border-solid border-stone-300">
      <View className="w-full">
        <View className="items-center px-2 py-3.5 w-full text-xs font-semibold border-b border-gray-100">
          <View className="w-full">
            <View className="">
              <Text className="font-semibold text-emerald-950">Sides</Text>
            </View>
            <View className="mt-1">
              <Text className="text-neutral-500">{sides.length} sides</Text>
            </View>
          </View>
        </View>

        {sides.map((side) => (
          <Side
            key={side.sideNumber}
            sideNumber={side.sideNumber}
            sideInfo={side.sideInfo}
          />
        ))}

        {gate && description &&
          <>
            <View className="items-center px-2 py-3.5 w-full text-xs font-semibold border-b border-gray-100">
              <View className="w-full">
                <View>
                  <Text className="font-semibold text-emerald-950">Gate</Text>
                </View>
                <View className="mt-1">
                  <Text className="text-neutral-500">{gate}</Text>
                </View>
              </View>
            </View>

            <View className="items-center px-2 py-1.5 w-full text-xs font-semibold">
              <View className="w-full">
                <View>
                  <Text className="font-semibold text-emerald-950">
                    Description
                  </Text>
                </View>
                <View className="mt-1 text-neutral-500">
                  <Text className="text-neutral-500">{description}</Text>
                </View>
              </View>
            </View>
          </>
        }
      </View>
    </View>
  );
};
