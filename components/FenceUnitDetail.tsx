import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FenceData, SavedFence } from "@/utils/Types";
import {
  downloadFile,
  inchesToFeet,
} from "@/utils/helperfunctions/HelperFunctions";
import * as Progress from "react-native-progress";
import {
  getObjectFromAsyncStorage,
  saveObjectToAsyncStorage,
} from "@/api/AsynStorage";
import { usePreviewContext } from "@/contexts/PreviewContext";

const FenceUnitDetail = ({ fence }: { fence: FenceData | null }) => {
  const [uris, setUris] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadFailed, setIsDownloadFailed] = useState(false);
  const { setSelectedFence } = usePreviewContext();
  const [fenceData, setFenceData] = useState<SavedFence | null>(null);
  const {fetchSavedFences} = usePreviewContext();

  useEffect(() => {
    console.log(fence?.name.replaceAll(" ", "_"));

    const getFenceFromAsyncstorage = async () => {
      const fenceData: SavedFence = await getObjectFromAsyncStorage(
        fence?.name.replaceAll(" ", "_") + "_pf_fence"
      );

      if (fenceData) {
        if (fenceData.imageUrls[0] != fence?.imageUrls[0]) {
          await saveObjectToAsyncStorage(
            fence?.name.replaceAll(" ", "_") + "_pf_fence",
            { ...fenceData, ...fence }
          );

          await fetchSavedFences();
        }
        setUris([fenceData.unitPath, fenceData.gatePath]);
        setFenceData(fenceData);
        setSelectedFence(fenceData);
      }
      console.log(fenceData);
    };

    getFenceFromAsyncstorage().catch((err) => console.error(err));
  }, []);

  const setDownloadProgress = (_progress: number, error: any) => {
    setProgress((prevState) => {
      if (progress >= 100) {
        return 100 + _progress;
      } else {
        return _progress;
      }
    });
  };

  const download = async () => {
    console.log("Downloading...");
    setIsDownloading(true);
    setIsDownloadFailed(false);

    try {
      if (!fence) return;
      const unitUri = await downloadFile(fence, false, setDownloadProgress);
      if (!unitUri) {
        console.error("Failed to download unit");
        setIsDownloadFailed(true);
        return;
      }

      const gateUri = await downloadFile(fence, true, setDownloadProgress);

      if (!gateUri) {
        // delete unit file
        console.error("Failed to download gate");
        setIsDownloadFailed(true);
        return;
      }

      console.log(gateUri, unitUri);
      setUris([unitUri, gateUri]);

      const toBeStored = {
        ...fence,
        gatePath: gateUri,
        unitPath: unitUri,
      };
      setFenceData(toBeStored);

      await saveObjectToAsyncStorage(
        fence.name.replaceAll(" ", "_") + "_pf_fence",
        toBeStored
      );
    } catch {
      setIsDownloadFailed(true);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <SafeAreaView className="p-4 flex-1 justify-between">
      <View>
        <View className="flex flex-row items-center justify-between mb-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex flex-row items-center space-x-2"
          >
            <Image
              source={require("../assets/icons/back.png")}
              className="w-[16px] h-[12px]"
            />
            <Text className="font-intersb text-[20px]">{fence?.name}</Text>
          </TouchableOpacity>

          {isDownloading && uris.length < 2 ? (
            <View>
              <Progress.Circle
                progress={progress / 100}
                size={25}
                indeterminate={progress < 5}
                showsText={true}
                strokeCap={"round"}
                formatText={() => `${Math.floor(progress)}%`}
                textStyle={{
                  fontSize: 7,
                  color: "#000000",
                  fontWeight: "bold",
                }}
              />
            </View>
          ) : uris.length === 2 ? (
            <View>
              <FontAwesome6 name="circle-check" size={24} color="green" />
            </View>
          ) : (
            <TouchableOpacity onPress={() => download()}>
              <Feather name="download" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>

        <View className="space-y-6 mt-5">
          <View className="flex-row items-start justify-between">
            <View>
              <Text className="text-neutral-800 text-base font-interbold">
                Fence gate
              </Text>
              <UnitDetail title="Width" value={fence?.gateWidth ?? 0} />
              <UnitDetail title="Height" value={fence?.gateHeight ?? 0} />
            </View>
            <View>
              <Text className="text-neutral-800 text-base font-interbold">
                Fence section
              </Text>
              <UnitDetail title="Unit Height" value={fence?.unitHeight ?? 0} />
              <UnitDetail
                title="Min Unit Section Width"
                value={fence?.minUnitWidth ?? 0}
              />
              <UnitDetail
                title="Max Unit Section Width"
                value={fence?.maxUnitWidth ?? 0}
              />
            </View>
          </View>

          <View className="rounded-[17px] bg-white p-3">
            <Text className="font-interbold text-[20px] my-5 px-4">
              Gallery
            </Text>
            <View className="flex-row">
              {fence?.imageUrls && (
                <View className="w-full">
                  <Image
                    source={{ uri: fence?.imageUrls[0] }}
                    className="w-full h-[300px] rounded-[12px]"
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {fenceData && (
        <TouchableOpacity
          onPress={() => {
            // setSelectedFence(fenceData);
            router.push("/home/preview");
          }}
          className="border border-primary-gray-light p-[1px] rounded-[17px] relative"
        >
          <View className="bg-neutral-800 p-[14px] rounded-[16px]">
            <Text className="text-white text-center text-[16px] font-intermedium">
              Preview
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default FenceUnitDetail;

const UnitDetail = ({ title, value }: { title: string; value: number }) => {
  return (
    <Text className="text-primary-gray-light text-base font-intermedium">
      {title}: <Text className="font-intersb">{inchesToFeet(value)}ft</Text>
    </Text>
  );
};
