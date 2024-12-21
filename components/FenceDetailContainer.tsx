import * as React from "react";
import { View } from "react-native";
import {FenceDetails} from "@/components/FenceDetails";

export const FenceDetailContainer: React.FC = () => {
    const fenceData = {
        title: "Cross pattern fence",
        metrics: [
            { label: "Fence height", value: "12ft" },
            { label: "Min section value", value: "12ft" },
            { label: "Max section value", value: "12ft" },
        ],
    };

    return (
        <FenceDetails title={fenceData.title} metrics={fenceData.metrics} />
    );
};
