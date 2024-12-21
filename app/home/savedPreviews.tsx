import { router } from "expo-router";
import { TouchableOpacity, Image, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {PreviewCard} from "@/components/PreviewCard";
import {DescriptionCard} from "@/components/DescriptionCard";
import {useEffect, useState} from "react";
import Search from "@/components/Search";
import { Feather } from "@expo/vector-icons";
import {usePreviews} from "@/hooks/usePreviews";
import {usePreviewContext} from "@/contexts/PreviewContext";
import {formatDateTime} from "@/utils/helperfunctions/utils";

const SavedPreviews = () => {
    const { savedFences, setSelectedFence } = usePreviewContext();

    const [search, setSearch] = useState("");

    const {
        previewLoading,
        previewError,
        previews,
        fetchSavedPreviews,
    } = usePreviews();

    useEffect(() => {
        // Automatically fetch previews on component mount
        fetchSavedPreviews();
    }, []);

    return (
        <SafeAreaView className="p-4 flex-1">
            <TouchableOpacity onPress={() => router.push("/home")} className="flex flex-row items-center space-x-2 mb-8">
                <Image source={require("../../assets/icons/back.png")} className="w-[16px] h-[12px]" />
                <Text className="font-intersb text-[20px]">Saved previews</Text>
            </TouchableOpacity>

            {
                previews.length > 0 && (
                    <View>
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

                        <Text className="text-primary-text text-base font-intersb mt-2 mb-3">{previews.length} saved previews found</Text>
                    </View>
                )
            }

            {
                previews.length == 0 ? (
                    <View className="h-full justify-center items-center bottom-8">
                        <TouchableOpacity
                            onPress={() => router.push("/home/preview")}
                            className="max-w-[287px] space-y-4 px-[12px] py-[48px] rounded-[25px] border border-gray-100"
                        >
                            <View className="items-center">
                                <Image className="w-[46px] h-[46px]" source={require("../../assets/icons/btn.png")} />
                            </View>
                            <View className="space-y-2">
                                <Text className="text-center font-intersb text-[16px]">No saved previews</Text>
                                <Text className="text-center text-[14px] text-gray-200">
                                    Start a preview and save afterwards to find them here
                                </Text>
                            </View>
                            <View className="items-center w-full mx-auto">
                                <Feather name="plus" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={previews}
                        showsVerticalScrollIndicator={false}
                        className=""
                        renderItem={({ item, index }) => (
                            <View key={item.createdAt} className="mb-3">
                                <DescriptionCard
                                    description={item.description}
                                    lastEdited={formatDateTime(item.updatedAt).dateOnly}
                                />
                            </View>
                        )}
                    />
                )
            }

        </SafeAreaView>
    );
};

export default SavedPreviews;
