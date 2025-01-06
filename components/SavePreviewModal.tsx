import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  Animated,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { PreviewPayload } from "@/utils/Types";
import { axiosInstance } from "@/api/AxiosInstance";
import userContext, { useUserContext } from "@/contexts/UserContext";
import { useARContext } from "@/contexts/ARContext";

type SavedPreviewModalProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenHandleSavePreview: () => void;
  handleCloseHandleSavePreview: () => void;
};

const SavedPreviewModal: React.FC<SavedPreviewModalProps> = ({
  setModal,
  handleOpenHandleSavePreview,
  handleCloseHandleSavePreview,
}) => {
  const [description, setDescription] = React.useState("");
  const { user } = useUserContext();
  const { savePreviewPayload } = useARContext();

  const [loading, setLoading] = useState(false);

  const data: PreviewPayload = {
    pins: [
      [0, 1, 3],
      [0, 1, 3],
      [0, 1, 3],
      [0, 1, 3],
      [0, 1, 3],
    ],
    description: "MR collins house",
    userId: user.id || "123456789",
  };

  const handleSavePreview = async () => {
    if (description.length < 1) return;

    setLoading(true);

    const data = savePreviewPayload(description);
    console.log(data, "from saved modals");

    try {
      const response = await axiosInstance.post(
        "/assets/preview",
        data._j
      );

      if (response.status == 201) {
        console.log("Preview saved successfully:", response.data);
        handleOpenHandleSavePreview();
      } else {
        throw "status: " + response.status;
      }
    } catch (error) {
      console.error("Error saving preview:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const closeMenu = () => {
    slideOut();
    setModal(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="absolute w-full h-full bg-neutral-200 rounded-tl-2xl rounded-tr-2xl">
          <View className="items-end p-[10px]">
            <TouchableOpacity
              onPress={() => closeMenu()}
              className="w-[30px] h-[30px] justify-center items-center rounded-full bg-neutral-800"
            >
              <FontAwesome6 name="xmark" color="#FFFFFF" size={20} />
            </TouchableOpacity>
          </View>

          <View className="px-[18px]">
            <View className="flex-row items-center space-x-2">
              <View>
                <Image
                  source={require("../assets/icons/gate.png")}
                  className="w-[29px] h-[20px]"
                />
              </View>
              <Text className="font-intersb text-lg">Save preview</Text>
            </View>

            <Text className="font-intermedium text-base mt-2">
              Save changes to your preview and exit preview mode?
            </Text>

            <View className="w-full flex-row justify-between mt-5">
              <Text className="font-intermedium text-[14px] text-gray-200">
                Description
              </Text>

              <Text className="font-intermedium text-[14px] text-gray-200">
                0/500
              </Text>
            </View>

            <TextInput
              style={{ minHeight: 200 }}
              className="mt-2 font-intermedium bg-gray-150 text-primary-text p-4 rounded-[12px] w-full border border-gray-100"
              value={description}
              onChangeText={(value) => setDescription(value)}
              placeholder="Enter a little description for this preview"
              placeholderTextColor={"#CECFCF"}
              multiline={true}
              numberOfLines={4}
            />

            <TouchableOpacity
              onPress={() => {
                handleSavePreview();
              }}
              disabled={loading}
              className="border border-primary-gray-light p-[1px] rounded-[17px] relative top-5"
            >
              <View className="bg-neutral-800 h-[50px] rounded-[16px] flex-row items-center justify-center">
                {loading ? (
                  <ActivityIndicator color={"#F6F8FA"} />
                ) : (
                  <Text className="text-white text-center text-[16px] font-intermedium">
                    Save preview
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SavedPreviewModal;
