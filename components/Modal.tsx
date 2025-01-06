import React, { useEffect, useRef } from "react";
import {View, Image, Text, Animated, TouchableOpacity, ScrollView, FlatList} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import Search from "@/components/Search";
import {usePreviewContext} from "@/contexts/PreviewContext";

type MenuModalProps = {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<MenuModalProps> = ({ setModal }) => {
    const { savedFences, setSelectedFence, fetchSavedFences } = usePreviewContext();

    const [search, setSearch] = React.useState("");

    const slide = useRef(new Animated.Value(750)).current;

    const slideIn = () => {
        Animated.timing(slide, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const slideOut = () => {
        Animated.timing(slide, {
            toValue: 750,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        slideIn();
        return () => {
            slideOut();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchSavedFences();
    }, []);

    const closeMenu = () => {
        slideOut();
        setModal(false);
    };

    return (
        <View className="absolute w-full bottom-0 h-fit bg-neutral-200 rounded-tl-2xl rounded-tr-2xl">
            <View className="items-end p-[10px]">
                <TouchableOpacity onPress={() => closeMenu()} className="w-[30px] h-[30px] justify-center items-center rounded-full bg-neutral-800">
                    <FontAwesome6 name="xmark" color="#FFFFFF" size={20} />
                </TouchableOpacity>
            </View>

            <View className="px-[18px]">
                <View className="flex-row items-center space-x-2">
                    <View>
                        <Image source={require("../assets/icons/gate.png")} className="w-[29px] h-[20px]" />
                    </View>
                    <Text className="font-intersb text-lg">Add fence</Text>
                </View>

                <Text className="font-intermedium text-base mt-2">Find and add fence to your previews</Text>

                {/* <View className="my-4 rounded-[12px] bg-gray-150">
                    <Search
                        placeholder="Find dimensions, Materials"
                        search={search}
                        setSearch={setSearch}
                        className=""
                    />
                </View> */}

                <FlatList
                    data={savedFences}
                    className="my-4"
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => setSelectedFence(item)} key={item.id} className="mr-2 w-[100px]">
                            <Image source={{ uri: item.imageUrls[0]}} className="w-full h-[60px] rounded-[5px]"/>
                            <Text className="mt-1 text-base font-intersb">{item.name}</Text>
                            {/* <Text className="text-sm font-intermedium"><Text>Description: </Text> {item.description}</Text> */}
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
};

export default Modal;
