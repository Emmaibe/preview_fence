import * as React from "react";
import { View } from "react-native";
import {FenceDetails} from "@/components/FenceDetails";
import { FenceData, SavedPreview } from "@/utils/Types";

export const FenceDetailContainer: React.FC<{fenceObject: FenceData}> = ({fenceObject}) => {

    return (
        <FenceDetails fence={fenceObject} />
    );
};
