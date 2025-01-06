import { router } from "expo-router";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FenceDetailContainer } from "@/components/FenceDetailContainer";
import { AntDesign } from "@expo/vector-icons";
import { FenceDimensionDetailsContainer } from "@/components/FenceDimensionDetailsContainer";
import { usePreviewContext } from "@/contexts/PreviewContext";
import { FenceData, SavedFence, SavedPreview } from "@/utils/Types";
import { axiosInstance } from "@/api/AxiosInstance";
import { useEffect, useState } from "react";

const fetchFence = async (id: string): Promise<FenceData | any> => {
  console.log(id);
  return (await axiosInstance.get(`/assets/${id}`)).data;
};

const useFetchFence = (id: string) => {
  const [data, setData] = useState();

  useEffect(() => {
    if(data) return;
    fetchFence(id)
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  });

  return data;
};

const FenceDetails = () => {
  const { selectedPreview, setSelectedPreviewForPreview } = usePreviewContext();
  const data = useFetchFence(selectedPreview?.fenceId as string);

  return (
    <SafeAreaView className="p-4 flex-1">
      <View className="flex flex-row items-center justify-between mb-8">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex flex-row items-center space-x-2"
        >
          <Image
            source={require("../../assets/icons/back.png")}
            className="w-[16px] h-[12px]"
          />
          <Text className="font-intersb text-[20px]">{selectedPreview?.description.substring(0, 20)}...</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("deleted")}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {data && <FenceDetailContainer fenceObject={data as SavedFence} />}

      <Text className="text-primary-text text-base font-intersb my-4">
        Dimensions
      </Text>

      <FenceDimensionDetailsContainer
        fence={data}
        preview={selectedPreview as SavedPreview}
      />

      <TouchableOpacity
        onPress={() => {
            setSelectedPreviewForPreview(selectedPreview);
            router.push("/home/preview")
        }}
        className="border border-primary-gray-light p-[1px] rounded-[17px] relative top-5"
      >
        <View className="bg-neutral-800 p-[14px] rounded-[16px]">
          <Text className="text-white text-center text-[16px] font-intermedium">
            Use
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FenceDetails;
