import * as React from "react";
import {FenceDimension} from "@/components/FenceDimension";

const fenceData = {
    sides: [
        { sideNumber: 1, sideInfo: { width: "12ft", sectionWidth: "12ft" } },
        { sideNumber: 2, sideInfo: { width: "12ft", sectionWidth: "12ft" } },
        { sideNumber: 3, sideInfo: { width: "12ft", sectionWidth: "12ft" } },
        { sideNumber: 4, sideInfo: { width: "12ft", sectionWidth: "12ft" } },
    ],
    gate: "Cross pattern close gate",
    description: "Description says this fence is of a certain dimension is of a particular set, etc",
};

export const FenceDimensionDetailsContainer: React.FC = () => {
    return <FenceDimension {...fenceData} />;
};
