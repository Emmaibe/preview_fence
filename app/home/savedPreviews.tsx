import { router } from "expo-router";
import { TouchableOpacity, Image, Text, View, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {PreviewCard} from "@/components/PreviewCard";
import {FenceDetailContainer} from "@/components/FenceDetailContainer";
import {DescriptionCard} from "@/components/DescriptionCard";
import search from "@/components/Search";
import { useState } from "react";
import Search from "@/components/Search";
import { Feather } from "@expo/vector-icons";

const SavedPreviews = () => {
    const [search, setSearch] = useState("");

    return (
        <SafeAreaView className="p-4 flex-1">
            <TouchableOpacity onPress={() => router.push("/home")} className="flex flex-row items-center space-x-2 mb-8">
                <Image source={require("../../assets/icons/back.png")} className="w-[16px] h-[12px]" />
                <Text className="font-intersb text-[20px]">Saved previews</Text>
            </TouchableOpacity>

            <Search
                placeholder="Find saved previews"
                search={search}
                setSearch={setSearch}
            />

            <TouchableOpacity className="mt-5">
                <PreviewCard
                    title="Add new preview"
                    subtitle="Create a new entry"
                    iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/90ae7f281c2122dd0c7c071aebdc6964f3fedba05cf365c5a10613b6302c0206?placeholderIfAbsent=true&apiKey=1415a67a21f046adbe116b8e2d2edb68"
                />
            </TouchableOpacity>

            <View className="flex-row items-center mt-4 w-full justify-between">
                <View className="border-t-2 border-gray-100 w-[42%]"></View>
                <Text className="font-intermedium text-sm text-gray-400">Previews</Text>
                <View className="border-t-2 border-gray-100 w-[42%]"></View>
            </View>

            <Text className="text-primary-text text-base font-intersb mt-2 mb-3">6 saved previews found</Text>

            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                showsVerticalScrollIndicator={false}
                className=""
                renderItem={({ item, index }) => (
                    <View key={item} className="mb-3">
                        <DescriptionCard
                            description="Description says this fence is of a certain dimension is of a particular set, etc"
                            lastEdited="Decenber 2, 2024"
                        />
                    </View>
                )}
            />

            {/*<View className="h-full justify-center items-center">*/}
            {/*    <TouchableOpacity className="max-w-[287px] space-y-4 px-[12px] py-[48px] rounded-[25px] border border-gray-100">*/}
            {/*        <View className="items-center">*/}
            {/*            <Image className="w-[46px] h-[46px]" source={require("../../assets/icons/btn.png")} />*/}
            {/*        </View>*/}
            {/*        <View className="space-y-2">*/}
            {/*            <Text className="text-center font-intersb text-[16px]">No saved previews</Text>*/}
            {/*            <Text className="text-center text-[14px] text-gray-200">*/}
            {/*                Start a preview and save afterwards to find them here*/}
            {/*            </Text>*/}
            {/*        </View>*/}
            {/*        <View className="items-center w-full mx-auto">*/}
            {/*            <Feather name="plus" size={24} color="black" />*/}
            {/*        </View>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}

            {/*<FenceDetailContainer />*/}

        </SafeAreaView>
    );
};

export default SavedPreviews;
