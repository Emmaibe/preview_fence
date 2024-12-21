import {FenceData} from "@/utils/Types";
import * as FileSystem from "expo-file-system";

export const inchesToFeet = (inches: number): string => {
    return (inches / 12).toFixed(2);
}

export const downloadFile = async (fenceMetadata: FenceData, isGate: boolean, setProgress: any) => {
    const fencesDir = FileSystem.documentDirectory + "fences/";
    const dirInfo = await FileSystem.getInfoAsync(fencesDir);
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(fencesDir, { intermediates: true });
    }

    const suffix = isGate ? "_gate.glb" : "_fence.glb";
    const fileUri = fencesDir + fenceMetadata.name + suffix;

    const downloadResumable = FileSystem.createDownloadResumable(
        isGate ? fenceMetadata.gateGlbUrl : fenceMetadata.unitGlbUrl,
        fileUri,
        undefined,
        //@ts-ignore
        (downloadProgress: FileSystem.DownloadProgressData): any => {
            const progress =
                downloadProgress.totalBytesWritten /
                downloadProgress.totalBytesExpectedToWrite;
            setProgress(progress * 100);
        }
    );
    try {
        const download = await downloadResumable.downloadAsync();
        return download?.uri;
        console.log("File downloaded to:", download?.uri);
    } catch (error) {
        console.error("Download failed:", error);
        throw(error);
    }
};
