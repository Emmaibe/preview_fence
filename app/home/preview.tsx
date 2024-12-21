import {FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Image, Text, TouchableOpacity, Animated } from "react-native";
import {useModalAnimation} from "@/hooks/useModalAnimation";
import {useModalContext} from "@/contexts/ModalContext";
import Modal from "@/components/Modal";
import SavedPreviewModal from "@/components/SavePreviewModal";
import OTPModal from "@/components/OTPModal";
import PreviewSavedModal from "@/components/PreviewSavedModal";
import { useState } from "react";

const Preview = () => {
    const { isVisible, translateYAnim } = useModalAnimation();
    const { setIsModalOpen } = useModalContext();

    const [option, setOption] = useState(false);

    return (
        <View className="flex-1">

            {isVisible && (
                <TouchableOpacity onPress={() => setIsModalOpen(false)} className="absolute top-0 left-0 bottom-0 right-0 z-[100] bg-neutral-800 opacity-80">

                </TouchableOpacity>
            )}

            {isVisible && (
                <TouchableOpacity onPress={() => setIsModalOpen(false)} className="absolute top-0 left-0 bottom-0 right-0 z-[150] bg-neutral-800 opacity-80">

                </TouchableOpacity>
            )}

            <Animated.View
                style={{
                    transform: [{ translateY: translateYAnim }],
                    position: "absolute",
                    top: "30%",
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: 200,
                }}
            >
                <PreviewSavedModal type={"login"} email={"emmanuelibe251@yahoo.com"} />
            </Animated.View>

            {/*<Animated.View*/}
            {/*    style={{*/}
            {/*        transform: [{ translateY: translateYAnim }],*/}
            {/*        position: "absolute",*/}
            {/*        top: "12%",*/}
            {/*        left: 0,*/}
            {/*        bottom: 0,*/}
            {/*        right: 0,*/}
            {/*        zIndex: 100,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Modal setModal={setIsModalOpen} />*/}
            {/*</Animated.View>*/}

            {/*<Animated.View*/}
            {/*    style={{*/}
            {/*        transform: [{ translateY: translateYAnim }],*/}
            {/*        position: "absolute",*/}
            {/*        top: "40%",*/}
            {/*        left: 0,*/}
            {/*        bottom: 0,*/}
            {/*        right: 0,*/}
            {/*        zIndex: 100,*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <SavedPreviewModal setModal={setIsModalOpen} />*/}
            {/*</Animated.View>*/}

            <Image
                source={require("../../assets/images/preview.png")}
                className="w-full h-full"
                resizeMode="cover"
            />

            <View className="mt-16 px-5 absolute flex-row w-full justify-between items-center">
                <TouchableOpacity className="px-2.5 py-2 bg-white rounded-full flex-row items-center space-x-1">
                    <Text className="text-sm font-interbold">Reset</Text>
                    <MaterialCommunityIcons name="restore" size={18} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity className="px-2.5 py-2 bg-white rounded-full flex-row items-center space-x-1">
                    <Text className="text-sm font-interbold">Save</Text>
                    <FontAwesome6 name="circle-check" size={18} color="black"/>
                </TouchableOpacity>
            </View>

            <View className="bottom-20 px-8 absolute w-full">
                <View className="flex-row w-full justify-between items-center max-w-[335px] mx-auto">
                    <View className="relative">

                        {
                            option &&
                            <Option
                                setIsModalOpen={setIsModalOpen}
                            />
                        }

                        <TouchableOpacity
                            onPress={() => setOption(!option)}
                            className="px-2.5 py-2 bg-white rounded-full flex-row items-center justify-center w-[64px] h-[64px] space-x-1">
                            <Image source={require("../../assets/icons/fence.png")} className="w-[29px] h-[20px]" />
                        </TouchableOpacity>
                    </View>

                    <View className="relative">
                        <View className="z-50 absolute -top-1.5 -left-1.5 items-center justify-center bg-[#9C2332] rounded-full w-[24px] h-[24px]">
                            <Text className="text-white font-interbold">4</Text>
                        </View>

                        <TouchableOpacity className="px-2.5 py-2 bg-white rounded-full flex-row items-center justify-center w-[64px] h-[64px] space-x-1">
                            <Image source={require("../../assets/icons/location-add.png")} className="w-[29px] h-[30px]" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity className="px-2.5 py-2 bg-white rounded-full flex-row items-center justify-center w-[64px] h-[64px] space-x-1">
                        <Image source={require("../../assets/icons/undo.png")} className="w-[23px] h-[18px]" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Preview;

const Option = ({setIsModalOpen}: {setIsModalOpen: (value: boolean) => void;}) => {
    return (
        <View className="absolute bottom-[120%] p-1.5 bg-neutral-200 rounded-[19px] space-y-1">
            <TouchableOpacity
                onPress={() => setIsModalOpen(true)}
                className="px-2.5 py-2 bg-gray-150 border border-gray-100 rounded-full flex-row items-center space-x-1 w-[120px]">
                <Text className="text-sm font-interbold">Change fence</Text>
                <MaterialCommunityIcons name="restore" size={18} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity className="px-2.5 py-2 rounded-full flex-row items-center space-x-1 w-[120px]">
                <Text className="text-sm font-interbold">Remove fence</Text>
                <Ionicons name="close" size={18} color="black" />
            </TouchableOpacity>
        </View>
    )
}
